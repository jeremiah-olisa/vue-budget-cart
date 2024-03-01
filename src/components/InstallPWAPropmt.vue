<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
  // AlertDialogTrigger
} from './ui/alert-dialog'
import { ref } from 'vue'

import Cookies from 'js-cookie'
import { useToast } from './ui/toast'
import { onMounted } from 'vue'

const { toast } = useToast()
const installPromptEvent = ref<BeforeInstallPromptEvent | null>(null)
const isModalOpen = ref(false)

const dismiss = () => {
  Cookies.set('add-to-home-screen', 'NOT INSTALLED', { expires: 15 })
  installPromptEvent.value = null
  isModalOpen.value = false
}

const install = () => {
  if (installPromptEvent.value) {
    isModalOpen.value = false
    return installPromptEvent.value.prompt()
  }

  toast({ description: 'PWA prompt not initialised', variant: 'destructive' })
}

onMounted(() => {
  // Event listener for beforeinstallprompt event
  window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the default behavior
    event.preventDefault()

    if (Cookies.get('add-to-home-screen') == undefined) {
      installPromptEvent.value = event as BeforeInstallPromptEvent
      isModalOpen.value = true
    }

    console.log({
      event,
      Cookies: Cookies.get('add-to-home-screen'),
      installPromptEvent: installPromptEvent.value
    })
    // Store the event for later use
  })
})
</script>

<template>
  <AlertDialog v-model:open="isModalOpen">
    <!-- <AlertDialogTrigger>Open</AlertDialogTrigger> -->
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Install Tracka</AlertDialogTitle>
        <AlertDialogDescription>
          Add Tracka to your home screen for easy access and an enhanced experience. Enjoy faster
          load times, offline access, and more by installing now!
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel variant="destructive" @click="dismiss()">Dismiss</AlertDialogCancel>
        <AlertDialogAction @click="install()">Install</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
