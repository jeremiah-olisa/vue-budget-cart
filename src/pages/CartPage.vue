<script setup lang="ts">
import AddItemModal from '@/components/AddItemModal.vue'
import CartItemTable from '@/components/CartItemTable.vue'
import SetBudgetForm from '@/components/SetBudgetForm.vue';
</script>

<template>
  <div>
    <SetBudgetForm />
    <!-- Top part: Budget setting -->
    <CartItemTable />
    <!-- Modal -->
    <AddItemModal />
  </div>
</template>

