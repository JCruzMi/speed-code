<script setup>
import { useDark } from '@vueuse/core';

const isDark = useDark();

const cases = ref([
  {
    id: 1,
    code: `data.find(x => x == 100)`,
    ops: "1000 ops/s",
  },
  {
    id: 2,
    code: `data.find(x => x == 200)`,
    ops: "1000 ops/s",
  },
  {
    id: 3,
    code: `data.find(x => x == 400)`,
    ops: "1000 ops/s",
  },
  {
    id: 4,
    code: `data.find(x => x == 800)`,
    ops: "1000 ops/s",
  },
]);
</script>

<template>
  <h2>Test cases</h2>
  <div class="test-cases">
    <Case
      v-for="testCase in cases"
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
