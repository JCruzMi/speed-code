<script setup>
import { ref } from 'vue';
import Editor from 'simple-code-editor';
import hljs from 'highlight.js';

const code = ref(`function() {
  console.log('Hello, World!');
}`);

const highlightCode = (code) => hljs.highlightAuto(code).value;
</script>

<template>
  <Editor v-model="code" :highlight="highlightCode" lang="javascript" />
</template>
