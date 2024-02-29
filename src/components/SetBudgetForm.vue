<script setup lang="ts">
import { useAppStore } from '@/stores'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { useToast } from './ui/toast'
import { ErrorMessage, Field, Form, type GenericObject, type SubmissionHandler } from 'vee-validate'
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

const setBudget: SubmissionHandler<GenericObject, GenericObject, unknown> = (_form, actions) => {
  if (!_form.budget) return

  appStore.setBudget(_form.budget)
  actions.resetForm()
  toast({
    description: `Budget has been set to ${appStore.totalBudget}`,
    variant: 'info'
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
      <Label>Set Budget</Label>
      <Field
        :as="Input"
        inputmode="numeric"
        type="number"
        name="budget"
        class="text-black"
        placeholder="Max amount you want to spend while shopping."
      />
      <ErrorMessage name="budget" class="text-red-500 text-sm" />
    </FormField>
    <div>
      <Button class="w-full" type="submit"> Set Budget </Button>
    </div>
  </Form>
  <div class="flex flex-wrap gap-4 justify-center">
    <!-- card 1 -->
    <div
      class="flex flex-col gap-2 h-40 text-white rounded-xl shadow-md p-6 my-5 w-full bg-blue-950 bg-opacity-90 backdrop-filter backdrop-blur-lg"
    >
      <div class="font-semibold text-lg">Budget</div>
      <div class="font-semibold lg:text-5xl md:text-3xl text-2xl tracking-tight">
        {{ formatCurrency(appStore.remainingBudget) }}
      </div>
      <div
        class="font-normal"
        v-if="appStore.totalBudget > 0"
        :class="{ 'text-red-600': appStore.remainingBudget <= appStore.totalBudget * 0.3 }"
      >
        Total Budget: {{ formatCurrency(appStore.totalBudget) }}
      </div>
    </div>
  </div>
</template>
