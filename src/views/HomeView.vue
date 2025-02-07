<script setup>
import TestCases from '@/components/TestCases.vue';
import GlobalCase from '@/components/GlobalCase.vue';
import ToggleTheme from '@/components/ToggleTheme.vue';
import Chart from '@/components/Chart.vue';

const globalCode = ref(`const data = [...Array(1000).keys()];`);
const cases = ref([
  {
    id: 1,
    code: `data.find(x => x == 100)`,
    ops: '',
  },
  {
    id: 2,
    code: `data.find(x => x == 200)`,
    ops: '',
  },
  {
    id: 3,
    code: `data.find(x => x == 400)`,
    ops: '',
  },
  {
    id: 4,
    code: `data.find(x => x == 800)`,
    ops: '',
  },
]);

function removeCase(id) {
  cases.value = cases.value.filter((testCase) => testCase.id !== id);
}

function addCase() {
  cases.value.unshift({
    id: cases.value.length + 1,
    code: '',
    ops: '',
  });
}

const results = ref([]);

async function runTest({ code, data }) {
  // limpiar los que tengan code vacio
  cases.value = cases.value.filter((testCase) => testCase.code !== '');

  const worker = new Worker('worker.js');
  worker.postMessage({ code, data, duration: 1000 });

  return new Promise((resolve) => {
    worker.onmessage = (event) => resolve(event.data);
  });
}

async function runTestCases() {
  const globalCodeValue = globalCode.value;

  cases.value.forEach((testCase) => {
    testCase.ops = 'Loading...';
  });

  results.value = [];

  const newResults = await Promise.all(
    cases.value.map((testCase) =>
      runTest({
        code: testCase.code,
        data: globalCodeValue,
      }).catch(() => 0)
    )
  );

  results.value = newResults;

  cases.value.forEach((testCase, index) => {
    const ops = newResults[index];
    testCase.ops = ops ? `${ops.toLocaleString()} ops/s` : 'Error';
  });
}

onMounted(() => {
  runTestCases();
});
</script>

<template>
  <main class="container">
    <article class="code-container">
      <ToggleTheme />
      <GlobalCase v-model="globalCode" />
      <TestCases v-model:cases="cases" @remove="removeCase" @add="addCase" />
      <button class="send-button" @click="runTestCases">
        Benchmark code! 🚀
      </button>
    </article>
    <aside class="chart-container">
      <Chart :results="results" />
    </aside>
  </main>
</template>

<style scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: row;
  overflow-y: auto;
  height: 100vh;
  -webkit-overflow-scrolling: touch;
}

.code-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  padding: 3rem 3rem;
  max-height: 100vh;
  width: 100%;
}

.chart-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: end;
  padding: 3rem 3rem 4rem;
  overflow-x: auto;
  width: 100%;
  background-color: var(--color-background-secondary);
}

.send-button {
  width: 200px;
  border-radius: 6px;
  background: var(--color-background-primary);
  border: 0;
  color: var(--color-text);
  cursor: pointer;
  padding: 6px;
  transition: all 0.4 ease-in-out;
}
.send-button:hover {
  background: rgba(0, 0, 0, 0.5);
  color: #ffffff;
}

@media (width < 768px) {
  .container {
    flex-direction: column;
  }

  .chart-container {
    padding: 3rem 3rem 2rem;
    overflow-x: auto;
    min-height: 400px;
  }
}
</style>
