<script setup>
const cases = defineModel("cases", {
  required: true,
  type: Array,
});

const emit = defineEmits(["remove", "add"]);

function getIndexCase(id) {
  return cases.value.findIndex((testCase) => testCase.id === id) + 1;
}

const loadingCases = inject("loadingCases");
</script>

<template>
  <div class="header-test-cases">
    <h2>Test cases</h2>
    <button
      @click="emit('add')"
      :disabled="cases.length === 10 || loadingCases"
    >
      Add Case
    </button>
  </div>
  <div class="test-cases" v-auto-animate>
    <span v-if="cases.length === 0">No test cases</span>
    <Case
      v-for="testCase in cases"
      :key="testCase.id"
      :id="getIndexCase(testCase.id)"
      :code="testCase.code"
      :ops="testCase.ops"
      :line-nums="true"
      :wrap="true"
      theme="a11y-dark"
      v-model:code="testCase.code"
      @remove="emit('remove', testCase.id)"
    />
  </div>
</template>

<style scoped>
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
