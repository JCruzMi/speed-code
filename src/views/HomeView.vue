<script setup>
import TestCases from '@/components/TestCases.vue';
import GlobalCase from '@/components/GlobalCase.vue';
import ToggleTheme from '@/components/ToggleTheme.vue';
import Chart from '@/components/Chart.vue';

const results = ref([]);
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
const loadingCases = ref(true);

function removeCase(id) {
  cases.value = cases.value.filter((testCase) => testCase.id !== id);
}

function addCase() {
  cases.value.unshift({
    id:
      cases.value.reduce((acc, testCase) => Math.max(acc, testCase.id), 0) + 1,
    code: '',
    ops: '',
  });
}

async function runTest({ code, data }) {
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
    testCase.ops = 'loading';
  });
  loadingCases.value = true;

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

  loadingCases.value = false;
}

onMounted(() => {
  runTestCases();
});

provide('loadingCases', loadingCases);
</script>

<template>
  <main class="container">
    <article class="main-container">
      <header class="header">
        <ToggleTheme />
        <button @click="runTestCases" :disabled="loadingCases">
          Benchmark code! 🚀
        </button>
      </header>
      <div class="case-container">
        <GlobalCase v-model="globalCode" />
        <TestCases v-model:cases="cases" @remove="removeCase" @add="addCase" />
      </div>
    </article>
    <aside class="chart-container">
      <Chart :results="results" />
    </aside>
  </main>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.main-container {
  width: 100%;
  overflow-y: auto;
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: sticky;
  top: 0;
  background-color: var(--color-background);
  z-index: 100;
  padding: 2rem 2rem;
}

.case-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 2rem 2rem 2rem;
}

.chart-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: end;
  padding: 2rem 2rem 2rem;
  overflow-x: scroll;
  width: 100%;
  background-color: var(--color-background-secondary);
}

@media (width < 768px) {
  .container {
    flex-direction: column;
    height: 100%;
    position: sticky;
    top: 0;
  }

  .chart-container {
    overflow-x: auto;
    min-height: auto;
  }

  .case-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
}
</style>
