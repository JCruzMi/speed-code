<script setup>
import { ref } from "vue";
import Case from "./Case.vue";

const cases = ref([
  {
    id: 1,
    code: `data.find(x => x == 1000)`,
    ops: 1000,
  },
  {
    id: 2,
    code: `data.find(x => x == 1000)`,
    ops: 1000,
  },
  {
    id: 3,
    code: `data.find(x => x == 1000)`,
    ops: 1000,
  },
  {
    id: 4,
    code: `data.find(x => x == 1000)`,
    ops: 1000,
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
    />
    <button class="send-button">Benchmark code! 🚀</button>
  </div>
</template>

<style scoped>
.test-cases {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.send-button {
  width: 200px;
  border-radius: 6px;
  background: var(--color-background-primary);
  border: 0;
  color: var(--color-text);
  cursor: pointer;
  padding: 6px;
  transition: background 0.3 ease;
  &:hover {
    background: rgba(0, 0, 0, 0.5);
    color: #ffffff;
  }
}
</style>
