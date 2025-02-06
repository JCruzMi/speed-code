<script setup>
import Editor from 'simple-code-editor';
import hljs from 'highlight.js';

const props = defineProps({
  id: Number,
  code: String,
  ops: String,
  theme: String,
});

const code = defineModel('code', {
  required: true,
  type: String,
});

const emit = defineEmits(['remove']);
</script>

<template>
  <article class="test-case">
    <header>
      <span class="test-id">{{ id }}</span>
      <div class="ops-container">
        <span class="ops">{{ ops }}</span>
        <span class="test-id delete" @click="emit('remove', id)">X</span>
      </div>
    </header>

    <Editor
      class="code"
      v-model="code"
      :highlight="hljs.highlightAuto"
      width="100%"
      :theme="theme"
    />
  </article>
</template>

<style scoped>
.ops-container {
  display: flex;
  gap: 5px;
  justify-items: center;
  align-items: center;
}

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
  padding: 7px;
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

.delete {
  cursor: pointer;
  height: 30px !important;
  width: 30px !important;
  display: flex;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
}

.ops {
  padding: 7px;
  background-color: var(--color-background-tertiary);
  border-radius: 8px;
}
</style>
