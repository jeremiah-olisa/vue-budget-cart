<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { formatCurrency } from '@/lib/utils'
import { useAppStore } from '@/stores'

const { items: data } = useAppStore()



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
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="data.length > 0">
            <TableRow v-for="row in data" :key="row.id">
              <TableCell>{{ row.name }}</TableCell>
              <TableCell>{{ formatCurrency(row.unitPrice) }}</TableCell>
              <TableCell>{{ row.quantity.toLocaleString() }}</TableCell>
              <TableCell>{{ formatCurrency(row.itemTotal()) }}</TableCell>
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
