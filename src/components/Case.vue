<script setup>
import Editor from 'simple-code-editor';
import hljs from 'highlight.js';

const props = defineProps({
  id: Number,
  code: String,
  ops: {
    required: false,
    type: String,
    default: '0 ops/s',
  },
  theme: String,
});

const code = defineModel('code', {
  required: true,
  type: String,
});

const emit = defineEmits(['remove']);
const loadingCases = inject('loadingCases');
</script>

<template>
  <article class="test-case">
    <header>
      <span class="ops test-id">{{ id }}</span>
      <div class="ops-container">
        <span class="ops">{{ ops }}</span>
        <button
          class="remove"
          @click="emit('remove', id)"
          :disabled="loadingCases"
        >
          ✖️
        </button>
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
@import 'highlight.js/styles/a11y-dark.css';
@import 'highlight.js/styles/a11y-light.css';

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

.test-id {
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.remove {
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
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

.ops {
  padding: 7px 10px;
  background-color: var(--color-background-tertiary);
  border-radius: 50px;
}
</style>
