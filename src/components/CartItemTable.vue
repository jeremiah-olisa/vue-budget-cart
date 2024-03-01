<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { useAppStore } from '@/stores'
import { Button } from './ui/button'
import { Trash } from 'lucide-vue-next'
import { Checkbox } from './ui/checkbox'

// const selectedItems = ref<string[]>([]);

const {
  items: data,
  getItemTotal,
  removeItem,
  addSelectedItem,
  isSelected,
  removeSelectedItem
} = useAppStore()

// const isSelected = (Itemid: string) => {
//   return selectedItems.value.includes(Itemid);
// }

// const toggleItem = (itemId: string) => {
//   if (!isSelected(itemId)) selectedItems.value = [...selectedItems.value, itemId]
//   selectedItems.value = selectedItems.value.filter(c => c != itemId)
//   console.log("Toggle", selectedItems.value, _selectedItems)

// }
// watch(selectedItems, () => {
//   setSelectedItems(selectedItems.value);
//   console.log("Watch", selectedItems.value, _selectedItems)
// })
</script>

<template>
  <div class="w-full">
    <div class="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Unit Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="data.length > 0">
            <TableRow v-for="row in data" :key="row.id">
              <TableCell>
                <Checkbox
                  v-if="isSelected(row.id)"
                  :checked="true"
                  @update:checked="removeSelectedItem(row.id)"
                />
                <Checkbox
                  v-if="!isSelected(row.id)"
                  :checked="false"
                  @update:checked="addSelectedItem(row.id)"
                />
                <!-- <Button @click="toggleItem(row.id)" variant="outline" size="icon">
                  <Plus class="w-4 h-4" />
                </Button> -->
              </TableCell>
              <TableCell
                ><label class="flex w-full" :for="row.id">{{ row.name }}</label></TableCell
              >
              <TableCell
                ><label class="flex w-full" :for="row.id">{{ row.unitPrice }}</label></TableCell
              >
              <TableCell
                ><label class="flex w-full" :for="row.id">{{
                  row.quantity.toLocaleString()
                }}</label></TableCell
              >
              <TableCell
                ><label class="flex w-full" :for="row.id">{{
                  getItemTotal(row.id)
                }}</label></TableCell
              >
              <TableCell>
                <Button @click="removeItem(row.id)" variant="destructive" size="icon">
                  <Trash class="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          </template>

          <TableRow v-else>
            <TableCell col-span="{columns.length}" class="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
