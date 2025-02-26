<script setup>
import { useDark } from "@vueuse/core";

const isDark = useDark();

const cases = defineModel("cases", {
  required: true,
  type: Array,
});

const emit = defineEmits(["remove", "add"]);

function getIndexCase(id) {
  return cases.value.findIndex((testCase) => testCase.id === id) + 1;
}
</script>

<template>
  <div class="header-test-cases">
    <h2>Test cases</h2>
    <button @click="emit('add')" class="add" :disabled="cases.length === 10">
      Add Case
    </button>
  </div>
  <div class="test-cases">
    <span v-if="cases.length === 0">No test cases</span>
    <Case
      v-for="testCase in cases"
      :key="testCase.id"
      :id="getIndexCase(testCase.id)"
      :code="testCase.code"
      :ops="testCase.ops"
      :line-nums="true"
      :wrap="true"
      :theme="isDark ? 'a11y-dark' : 'a11y-light'"
      v-model:code="testCase.code"
      @remove="emit('remove', testCase.id)"
    />
  </div>
</template>

<style scoped>
.add {
  background-color: var(--color-background-tertiary);
  border-radius: 8px;
  padding: 7px;
  cursor: pointer;
  border: var(--color-background-primary) solid 2px;
}

.add:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.header-test-cases {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.test-cases {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
