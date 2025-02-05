<script setup>
import TestCases from "@/components/TestCases.vue";
import GlobalCase from "@/components/GlobalCase.vue";
import ToggleTheme from "@/components/ToggleTheme.vue";

const globalCode = ref(`const data = [...Array(1000).keys()];`);

async function runTest({ code, data }) {
  const worker = new Worker("worker.js");
  worker.postMessage({ code, data, duration: 1000 });
  return new Promise((resolve) => {
    worker.onmessage = (event) => {
      console.log("El worker dice:", event.data);
      resolve(event.data);
    };
  });
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
</script>

<template>
  <main class="container">
    <ToggleTheme />
    <GlobalCase v-model="globalCode" />
    <TestCases />
    <button class="send-button" @click="runTestCases">
      Benchmark code! 🚀
    </button>
  </main>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 1280px;
  margin: 0 auto;
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
