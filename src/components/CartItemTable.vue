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

const { items: data, getItemTotal, removeItem } = useAppStore()
</script>

<template>
  <div class="w-full">
    <div class="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead> Name</TableHead>
            <TableHead> Unit Price</TableHead>
            <TableHead> Quantity</TableHead>
            <TableHead> Total</TableHead>
            <TableHead> Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="data.length > 0">
            <TableRow v-for="row in data" :key="row.id">
              <TableCell>{{ row.name }}</TableCell>
              <TableCell>{{ row.unitPrice }}</TableCell>
              <TableCell>{{ row.quantity.toLocaleString() }}</TableCell>
              <TableCell>{{ getItemTotal(row.id) }}</TableCell>
              <TableCell>
                <Button @click="removeItem(row.id)" variant="destructive" size="icon">
                  <Trash class="w-4 h-4" /> </Button
              ></TableCell>
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
