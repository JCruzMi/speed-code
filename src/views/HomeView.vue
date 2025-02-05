<script setup>
import TestCases from "@/components/TestCases.vue";
import GlobalCase from "@/components/GlobalCase.vue";
import ToggleTheme from "@/components/ToggleTheme.vue";
import Chart from "@/components/Chart.vue";

const globalCode = ref(`const data = [...Array(1000).keys()];`);

async function runTest({ code, data }) {
  const worker = new Worker("worker.js");
  worker.postMessage({ code, data, duration: 1000 });

  const { resolve, promise } = Promise.withResolvers();
  worker.onmessage = (event) => {
    resolve(event.data);
  };
  return promise;
}

async function runTestCases() {
  const $testCases = document.querySelectorAll(".test-case");
  const globalCodeValue = globalCode.value;

  $testCases.forEach(async (testCase) => {
    const $code = testCase.querySelector(".code");
    const $ops = testCase.querySelector(".ops");

    const codeValue = $code.querySelector("textarea").value;
    $ops.textContent = "Loading...";

    const result = await runTest({
      code: codeValue,
      data: globalCodeValue,
    });

    $ops.textContent = `${result.toLocaleString()} ops/s`;
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
      <TestCases />
      <button class="send-button" @click="runTestCases">
        Benchmark code! 🚀
      </button>
    </article>
    <aside class="chart-container">
      <Chart />
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

@media (orientation: landscape) {
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
