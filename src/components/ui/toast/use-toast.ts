import { computed, ref } from 'vue'
import type { Component, VNode } from 'vue'
import type { ToastProps } from '.'

export const TOAST_LIMIT = 2
export const TOAST_REMOVE_DELAY = 2000

export type StringOrVNode = string | VNode | (() => VNode)

type ToasterToast = ToastProps & {
  id: string
  title?: string
  description?: StringOrVNode
  action?: Component
}

const actionTypes = {
  ADD_TOAST: 'ADD_TOAST',
  UPDATE_TOAST: 'UPDATE_TOAST',
  DISMISS_TOAST: 'DISMISS_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST'
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType['ADD_TOAST']
      toast: ToasterToast
    }
  | {
      type: ActionType['UPDATE_TOAST']
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType['DISMISS_TOAST']
      toastId?: ToasterToast['id']
    }
  | {
      type: ActionType['REMOVE_TOAST']
      toastId?: ToasterToast['id']
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

/**
 * The function `addToRemoveQueue` adds a toast to a removal queue with a delay before removing it.
 * @param {string} toastId - The `toastId` parameter is a unique identifier for a specific toast
 * message that is being displayed to the user.
 * @returns If the `toastId` is already in the `toastTimeouts` map, the function `addToRemoveQueue`
 * will return without doing anything.
 */
function addToRemoveQueue(toastId: string, delay = TOAST_REMOVE_DELAY) {
  if (toastTimeouts.has(toastId)) return

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: actionTypes.REMOVE_TOAST,
      toastId
    })
  }, delay)

  toastTimeouts.set(toastId, timeout)
}

const state = ref<State>({
  toasts: []
})

function dispatch(action: Action) {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      state.value.toasts = [action.toast, ...state.value.toasts].slice(0, TOAST_LIMIT)
      addToRemoveQueue(action.toast.id, 30000)
      break

    case actionTypes.UPDATE_TOAST:
      state.value.toasts = state.value.toasts.map((t) =>
        t.id === action.toast.id ? { ...t, ...action.toast } : t
      )
      break

    case actionTypes.DISMISS_TOAST: {
      const { toastId } = action

      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.value.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      state.value.toasts = state.value.toasts.map((t) =>
        t.id === toastId || toastId === undefined
          ? {
              ...t,
              open: false
            }
          : t
      )
      break
    }

    case actionTypes.REMOVE_TOAST:
      if (action.toastId === undefined) state.value.toasts = []
      else state.value.toasts = state.value.toasts.filter((t) => t.id !== action.toastId)

      break
  }
}

function useToast() {
  return {
    toasts: computed(() => state.value.toasts),
    toast,
    dismiss: (toastId?: string) => dispatch({ type: actionTypes.DISMISS_TOAST, toastId })
  }
}

type Toast = Omit<ToasterToast, 'id'>

function toast(props: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: actionTypes.UPDATE_TOAST,
      toast: { ...props, id }
    })

  const dismiss = () => dispatch({ type: actionTypes.DISMISS_TOAST, toastId: id })

  dispatch({
    type: actionTypes.ADD_TOAST,
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open: boolean) => {
        if (!open) dismiss()
      }
    }
  })

  return {
    id,
    dismiss,
    update
  }
}

export { toast, useToast }
