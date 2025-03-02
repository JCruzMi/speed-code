<script setup>
import Editor from "simple-code-editor";
import hljs from "highlight.js";

const global = defineModel();
const highlightCode = (global) => hljs.highlightAuto(global).value;
</script>

<template>
  <h2>Global case</h2>
  <Editor v-model="global" :highlight="highlightCode" theme="a11y-dark" />
</template>

<style scoped>
.code-editor {
  width: 100% !important;
}
</style>
