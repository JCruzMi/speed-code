<script setup>
import Editor from 'simple-code-editor';
import hljs from 'highlight.js';

const code = ref(`function() {
  console.log('Hello, World!');
}`);

const highlightCode = (code) => hljs.highlightAuto(code).value;
</script>

<template>
  <h2>Global case</h2>
  <Editor
    v-model="code"
    :highlight="highlightCode"
    lang="javascript"
    theme="a11y-dark"
  />
</template>
