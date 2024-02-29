
<script setup lang="ts">
import { Plus } from 'lucide-vue-next';
</script>
<template>
  <!-- component -->
  <div class="group fixed bottom-0 right-0 p-2 flex items-end justify-end w-24 h-24">
    <!-- main -->
    <div
      class="text-white shadow-xl flex items-center justify-center p-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 z-50 absolute"
    >
      <Plus class="w-6 h-6 group-hover:scale-110 transition transition-all duration-[0.6s]" />
    </div>

  </div>
</template>
