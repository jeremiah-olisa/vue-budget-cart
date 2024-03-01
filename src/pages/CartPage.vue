<script setup lang="ts">
import AddItemModal from '@/components/AddItemModal.vue'
import CartItemTable from '@/components/CartItemTable.vue'
import InstallPWAPropmt from '@/components/InstallPWAPropmt.vue'
import SetBudgetForm from '@/components/SetBudgetForm.vue'
</script>

<template>
  <div>
    <InstallPWAPropmt />

    <SetBudgetForm />
    <!-- Top part: Budget setting -->
    <CartItemTable />
    <!-- Modal -->
    <AddItemModal />
  </div>
</template>
