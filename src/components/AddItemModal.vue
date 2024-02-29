<script setup lang="ts">
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
import { Plus } from 'lucide-vue-next'
import { z } from 'zod'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useAppStore, CartItem } from '@/stores/index'
import { useToast } from './ui/toast'
import DialogDescription from './ui/dialog/DialogDescription.vue'
import FloatingActionButton from './FloatingActionButton.vue'

const fields = [
  { placeholder: 'Name of item you want to buy', type: 'text', label: 'Item Name', id: 'itemName' },
  { placeholder: 'How many are you buying?', type: 'number', label: 'Unit', id: 'unit' },
  { placeholder: 'Price per one item', type: 'number', label: 'Unit Price', id: 'unitPrice' }
]

interface IFormFields {
  itemName: string
  unit: number
  unitPrice: number
}
// Zod schema for form validation
const schema = toTypedSchema(
  z.object({
    itemName: z.string(),
    unit: z.number().int().positive(),
    unitPrice: z.number().positive()
  })
)

const appStore = useAppStore()

const { toast } = useToast()

const addItem = (_form: any) => {
  const form: IFormFields = _form
  const cartItem = new CartItem(Date.now(), form.itemName, form.unitPrice, form.unit)

  if (cartItem.itemTotal() < appStore.remainingBudget) {
    appStore.addItem(cartItem)
    toast({ description: 'Item added to cart successfully' })
    // _form.resetForm()
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
  <Dialog>
    <DialogTrigger as-child>
      <FloatingActionButton />
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
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
            :placeholder="field.placeholder"
            class="col-span-3"
            :as="Input"
          />
          <ErrorMessage class="text-red-700 text-sm" :name="field.id" />
        </div>
        <DialogFooter>
          <Button type="submit" class="w-full"> <Plus class="w-4 h-4 mr-2" /> Add changes </Button>
        </DialogFooter>
      </Form>
    </DialogContent>
  </Dialog>
</template>
@/stores
