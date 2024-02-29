<script setup lang="ts">
import { Toaster } from './components/ui/toast'
import CartPage from './pages/CartPage.vue'
</script>

<template>
  <div class="flex h-screen justify-center content-center">
    <div class="w-9/12">
      <CartPage />
    </div>
    <Toaster />
  </div>
</template>
