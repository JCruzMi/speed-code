<script setup>
import { useDark } from "@vueuse/core";

const isDark = useDark();
const props = defineProps(["cases"]);
</script>

<template>
  <h2>Test cases</h2>
  <div class="test-cases">
    <Case
      v-for="testCase in props.cases"
      :key="testCase.id"
      :id="testCase.id"
      :code="testCase.code"
      :ops="testCase.ops"
      :line-nums="true"
      :wrap="true"
      :theme="isDark ? 'a11y-dark' : 'a11y-light'"
    />
  </div>
</template>

<style scoped>
.test-cases {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
