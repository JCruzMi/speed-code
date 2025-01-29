<script setup lang="ts"></script>

<template>
  <h2>Test cases</h2>
  <div class="test-cases">
    <article class="test-case">
      <header>
        <span class="test-id">1</span>
        <span class="ops">1 203,360 ops/s</span>
      </header>

      <textarea class="code" rows="1">data.find(x => x == 1000)</textarea>
    </article>

    <article class="test-case">
      <header>
        <span class="test-id">2</span>
        <span class="ops">2 150,360 ops/s</span>
      </header>

      <textarea class="code" rows="1">data.find(x => x == 1000)</textarea>
    </article>

    <article class="test-case">
      <header>
        <span class="test-id">3</span>
        <span class="ops">3 100,360 ops/s</span>
      </header>

      <textarea class="code" rows="1">data.find(x => x == 1000)</textarea>
    </article>

    <article class="test-case">
      <header>
        <span class="test-id">4</span>
        <span class="ops">4 500,360 ops/s</span>
      </header>

      <textarea class="code" rows="1">data.find(x => x == 1000)</textarea>
    </article>

    <button class="send-button">Benchmark code! 🚀</button>
  </div>
</template>

<style scoped>
.test-cases {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.test-case {
  background: #2a2a2a;
  border-radius: 6px;
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    padding: 5px;
    align-items: center;

    .test-id {
      width: 20px;
      height: 20px;
      background: #141414;
      border-radius: 999px;
      justify-content: center;
      align-items: center;
      display: flex;
      color: rgba(255, 255, 255, 0.7);
    }
  }

  .code {
    border-radius: 0 0 6px 6px;
  }
}

.send-button {
  width: 200px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.3);
  border: 0;
  color: #ffffff;
  cursor: pointer;
  padding: 6px;
  transition: background 0.3 ease;
  &:hover {
    background: rgba(255, 255, 255, alpha) 0.5;
  }
}
</style>
