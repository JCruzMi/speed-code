<script setup>
import { defineProps } from 'vue';
import Editor from 'simple-code-editor';
import hljs from 'highlight.js';

const props = defineProps({
  id: Number,
  code: String,
  ops: Number,
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
    />
  </article>
</template>

<style scoped>
.test-case {
  border-radius: 12px;
  padding: 4px;
  display: flex;
  flex-direction: column;
  background: #a8a8a8;
}
header {
  display: flex;
  border-radius: 100px;
  background: #2a2a2a;
  justify-content: space-between;
  font-size: 12px;
  padding: 5px;
  align-items: center;
}
.test-id {
  width: 20px;
  height: 20px;
  background: #180a0a;
  border-radius: 999px;
  justify-content: center;
  align-items: center;
  display: flex;
  color: rgba(255, 255, 255, 0.7);
}

.code {
  border-radius: 0 0 6px 6px;
}
</style>
