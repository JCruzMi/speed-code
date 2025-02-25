<script setup>
import TestCases from "@/components/TestCases.vue";
import GlobalCase from "@/components/GlobalCase.vue";
import ToggleTheme from "@/components/ToggleTheme.vue";
import Chart from "@/components/Chart.vue";

const globalCode = ref(`const data = [...Array(1000).keys()];`);
const cases = ref([
  {
    id: 1,
    code: `data.find(x => x == 100)`,
    ops: "",
  },
  {
    id: 2,
    code: `data.find(x => x == 200)`,
    ops: "",
  },
  {
    id: 3,
    code: `data.find(x => x == 400)`,
    ops: "",
  },
  {
    id: 4,
    code: `data.find(x => x == 800)`,
    ops: "",
  },
]);

function removeCase(id) {
  cases.value = cases.value.filter((testCase) => testCase.id !== id);
}

function addCase() {
  cases.value.unshift({
    id: cases.value.length + 1,
    code: "",
    ops: "",
  });
}

const results = ref([]);

async function runTest({ code, data }) {
  cases.value = cases.value.filter((testCase) => testCase.code !== "");

  const worker = new Worker("worker.js");
  worker.postMessage({ code, data, duration: 1000 });

  return new Promise((resolve) => {
    worker.onmessage = (event) => resolve(event.data);
  });
}

async function runTestCases() {
  const globalCodeValue = globalCode.value;

  cases.value.forEach((testCase) => {
    testCase.ops = "Loading...";
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
    testCase.ops = ops ? `${ops.toLocaleString()} ops/s` : "Error";
  });
}

onMounted(() => {
  runTestCases();
});
</script>

<template>
  <main class="container">
    <article class="main-container">
      <header class="header">
        <ToggleTheme />
        <button class="send-button" @click="runTestCases">
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
  display: flex;
  flex-direction: row;
  overflow-y: auto;
  height: 100vh;
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
  padding: 2rem 3rem;
}

.case-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 3rem;
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
  background-color: var(--color-background-tertiary);
  border-radius: 8px;
  padding: 7px;
  cursor: pointer;
  border: var(--color-background-primary) solid 2px;
  width: 150px;
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
