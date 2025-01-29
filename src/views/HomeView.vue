<script setup lang="ts">
import TestCases from "@/components/TestCases.vue";
import GlobalCase from "@/components/GlobalCase.vue";
</script>

<template>
  <main class="container">
    <GlobalCase />
    <TestCases />
  </main>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 1280px;
  margin: 0 auto;
}
</style>
