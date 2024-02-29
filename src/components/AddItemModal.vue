<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Plus } from 'lucide-vue-next'
import { z } from 'zod'
import { Form, Field, ErrorMessage, type GenericObject, type SubmissionHandler } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useAppStore, CartItem } from '@/stores/index'
import { useToast } from './ui/toast'
import DialogDescription from './ui/dialog/DialogDescription.vue'
import FloatingActionButton from './FloatingActionButton.vue'

const fields = [
  { placeholder: 'Name of item you want to buy', type: 'text', label: 'Item Name', id: 'itemName' },
  {
    placeholder: 'Price per one item',
    type: 'number',
    inputmode: 'numeric',
    label: 'Unit Price',
    id: 'unitPrice'
  },
  {
    placeholder: 'How many are you buying?',
    type: 'number',
    inputmode: 'numeric',
    label: 'Quantity',
    id: 'quantity',
    value: '1'
  }
]

// interface IFormFields extends GenericObject {
//   itemName: string
//   quantity: number
//   unitPrice: number
// }
// Zod schema for form validation
const schema = toTypedSchema(
  z.object({
    itemName: z.string(),
    quantity: z.number().int().positive(),
    unitPrice: z.number().positive()
  })
)

const appStore = useAppStore()
const { toast } = useToast()

const isModalOpen = ref(false)
const leaveModalOpen = ref(false)

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value
}

const addItem: SubmissionHandler<GenericObject, GenericObject, unknown> = (form, actions) => {
  const cartItem = new CartItem(Date.now(), form.itemName, form.unitPrice, form.quantity)
  if (cartItem.itemTotal() < appStore.remainingBudget) {
    appStore.addItem(cartItem)
    actions.resetForm()
    toast({ description: 'Item added to cart successfully', variant: 'info' })

    !leaveModalOpen.value && toggleModal()
    return
  }

  toast({
    title: 'Uh oh! Insufficient Budget.',
    description: "You can't add this item to cart because you don't a sufficient balance",
    variant: 'destructive'
  })
}
</script>

<template>
  <Dialog v-model:open="isModalOpen">
    <FloatingActionButton>
      <DialogTrigger as-child>
        <Plus class="w-6 h-6 group-hover:scale-110 transition transition-all duration-700" />
      </DialogTrigger>
    </FloatingActionButton>
    <DialogContent class="sm:max-w-[425px] max-w-[75%] rounded-xl">
      <DialogHeader>
        <DialogTitle>Add Item To Cart</DialogTitle>
        <DialogDescription>
          Welcome! You're about to add an item to your shopping cart. Please fill in the details
          below to proceed. Happy shopping!
        </DialogDescription>
      </DialogHeader>
      <Form class="grid gap-6 py-4" @submit="addItem" :validation-schema="schema">
        <div
          v-for="field in fields"
          :key="field.id"
          class="grid w-full max-w-sm items-center gap-2"
        >
          <Label :for="field.id"> {{ field.label }} </Label>
          <Field
            :name="field.id"
            :id="field.id"
            :type="field.type"
            :inputmode="field.inputmode"
            :placeholder="field.placeholder"
            :value="field.value"
            class="col-span-3"
            :as="Input"
          />
          <ErrorMessage class="text-red-700 text-sm" :name="field.id" />
        </div>
        <div class="flex items-center space-x-2">
          <Checkbox v-model:checked="leaveModalOpen" id="addMoreItems" />
          <Label
            for="addMoreItems"
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Add More Item
          </Label>
        </div>
        <DialogFooter>
          <Button type="submit" class="w-full">
            <Plus class="w-4 h-4 mr-2" /> {{ !leaveModalOpen ? 'Add Item' : 'Continue' }}
          </Button>
        </DialogFooter>
      </Form>
    </DialogContent>
  </Dialog>
</template>
