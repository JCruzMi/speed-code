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

const results = ref([]);

async function runTest({ code, data }) {
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
    <article class="code-container">
      <ToggleTheme />
      <GlobalCase v-model="globalCode" />
      <TestCases v-model:cases="cases" />
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
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 62vh auto;
  grid-template-areas:
    "graph"
    "tests";
  overflow-y: auto;
  height: 100%;
  -webkit-overflow-scrolling: touch;
}

@media (min-width: 1024px) {
  .container {
    grid-template-areas: "tests graph";
    grid-template-columns: 2fr 1.38fr;
    grid-template-rows: 1fr;
  }
}

.code-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  grid-area: tests;
  overflow-y: auto;
  padding: 3rem 3rem;
  max-height: 100vh;
  max-width: 100vw;
}

.chart-container {
  grid-area: graph;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem 3rem 4rem;
  overflow-x: auto;
  max-width: 100vw;
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
  transition: background 0.3 ease;
  &:hover {
    background: rgba(0, 0, 0, 0.5);
    color: #ffffff;
  }
}
</style>
