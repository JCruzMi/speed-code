<script setup>
import Editor from "simple-code-editor";
import hljs from "highlight.js";

const props = defineProps({
  id: Number,
  code: String,
  ops: String,
  theme: String,
});

const emit = defineEmits(["update:code"]);

const updateCode = (event) => {
  emit("update:code", { id: props.id, newCode: event.target.value });
};
</script>

<template>
  <article class="test-case">
    <header>
      <span class="test-id">{{ id }}</span>
      <span class="ops">{{ ops }}</span>
    </header>

    <Editor
      class="code"
      :value="code"
      :highlight="hljs.highlightAuto"
      @input="updateCode"
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

.ops {
  padding: 7px;
  background-color: var(--color-background-tertiary);
  border-radius: 10px;
}
</style>
