<script setup>
import Editor from 'simple-code-editor';
import hljs from 'highlight.js';

const props = defineProps({
  id: Number,
  code: String,
  ops: Number,
  theme: String,
});
</script>

<template>
  <article class="test-case">
    <header>
      <span class="test-id">{{ id }}</span>
      <span class="ops">{{ ops }}</span>
    </header>

    <Editor
      :value="code"
      :highlight="hljs.highlightAuto"
      lang="javascript"
      readonly
      width="100%"
      :theme="theme"
    />
  </article>
</template>

<style scoped>
.test-case {
  border-radius: 12px;
  display: flex;
  padding: 5px;
  flex-direction: column;
  background: var(--color-background-primary);
  gap: 5px;
}
header {
  display: flex;
  border-radius: 10px;
  justify-content: space-between;
  font-size: 12px;
  padding: 5px 7px;
  align-items: center;
  background: var(--color-background-secondary);
}
.test-id {
  width: 20px;
  height: 20px;
  border-radius: 999px;
  justify-content: center;
  align-items: center;
  display: flex;
  background: var(--color-background-tertiary);
  color: var(--color-text);
}

.code {
  border-radius: 0 0 6px 6px;
}
</style>
