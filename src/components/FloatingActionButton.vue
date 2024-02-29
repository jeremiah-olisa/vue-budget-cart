<script setup lang="ts">
import { useAppStore } from '@/stores'
import { BookX, Plus, Trash } from 'lucide-vue-next'

const { clearBudget, clearCart } = useAppStore()
</script>
<template>
  <div class="group fixed bottom-0 right-0 p-2 flex items-end justify-end w-24 h-24">
    <!-- main -->
    <div
      title="Add Item"
      class="text-white shadow-xl flex items-center justify-center p-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 z-50 absolute"
    >
      <Plus class="w-6 h-6 group-hover:scale-110 transition transition-all duration-700" />
    </div>
    <!-- sub left -->
    <div
      class="absolute rounded-full transition-all duration-700 ease-out scale-y-0 group-hover:scale-y-100 group-hover:-translate-x-16 flex p-2 hover:p-3 bg-blue-300 scale-100 hover:bg-blue-400 text-white"
    >
      <slot />
    </div>
    <!-- sub top -->
    <div
      title="Clear Cart"
      @click="clearCart()"
      class="absolute rounded-full transition-all duration-700 ease-out scale-x-0 group-hover:scale-x-100 group-hover:-translate-y-16 flex p-2 hover:p-3 bg-red-300 hover:bg-red-500 text-white"
    >
      <Trash class="w-6 h-6 group-hover:scale-110 transition transition-all duration-700" />
    </div>
    <div
      title="Clear Budget"
      @click="clearBudget()"
      class="absolute rounded-full transition-all duration-700 ease-out scale-x-0 group-hover:scale-x-100 group-hover:-translate-y-14 group-hover:-translate-x-14 flex p-2 hover:p-3 bg-slate-600 hover:bg-slate-700 text-white"
    >
      <BookX class="w-6 h-6 group-hover:scale-110 transition transition-all duration-700" />
    </div>
  </div>
</template>
