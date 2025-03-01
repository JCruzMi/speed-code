<script setup>
import { useDark } from '@vueuse/core';
import Editor from 'simple-code-editor';
import hljs from 'highlight.js';

const global = defineModel();
const isDark = useDark();

const editorTheme = computed(() => (isDark.value ? 'a11y-dark' : 'a11y-light'));

const highlightCode = (global) => hljs.highlightAuto(global).value;
</script>

<template>
  <h2>Global case</h2>
  <Editor v-model="global" :highlight="highlightCode" :theme="editorTheme" />
</template>

<style scoped>
.code-editor {
  width: 100% !important;
}
</style>
