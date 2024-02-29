<script setup lang="ts">
import { useAppStore } from '@/stores'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { useToast } from './ui/toast'
import { ErrorMessage, Field, Form } from 'vee-validate'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { FormField } from './ui/form'
import { formatCurrency } from '@/lib/utils'

// Zod schema for form validation
const schema = toTypedSchema(
  z.object({
    budget: z.number().int().min(1000).positive()
  })
)

const appStore = useAppStore()

const { toast } = useToast()

const setBudget = (_form: any) => {
  if (!_form.budget) return

  appStore.setBudget(_form.budget)
  // _form.resetForm()
  toast({
    description: `Budget has been set to ${appStore.totalBudget}`,
    variant: 'default'
  })
}
</script>

<template>
  <Form
    class="w-full bg-[#2e3a65] p-3 rounded-xl text-white space-y-6 my-5"
    @submit="setBudget"
    :validation-schema="schema"
  >
    <FormField name="budget">
      <Label>Set Budgets</Label>
      <Field
        :as="Input"
        type="number"
        name="budget"
        class="text-black"
        placeholder="Max amount you want to spend while shopping."
      />
      <ErrorMessage name="budget" class="text-red-500 text-sm" />
    </FormField>
    <div>
      <Button class="w-full" type="submit"> Submit </Button>
    </div>
  </Form>
  <div class="flex flex-wrap gap-4 justify-center">
    <!-- card 1 -->
    <div
      class="flex flex-col gap-2 h-40 text-white rounded-xl shadow-md p-6 my-5 w-full bg-blue-950 bg-opacity-90 backdrop-filter backdrop-blur-lg"
    >
      <div class="font-semibold text-lg">Budget</div>
      <div class="font-semibold text-5xl tracking-tight">
        {{ formatCurrency(appStore.totalBudget) }}
      </div>
      <div
        class="font-normal"
        v-if="appStore.totalBudget > 0"
        :class="{ 'text-red-600': appStore.remainingBudget <= appStore.totalBudget * 0.3 }"
      >
        Remaining: {{ formatCurrency(appStore.remainingBudget) }}
      </div>
    </div>
  </div>
</template>
