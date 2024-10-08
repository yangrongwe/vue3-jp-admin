<template>
  <pre class="hljs">
    <code v-html="highlightedCode"></code>
  </pre>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/default.css';

hljs.registerLanguage('javascript', javascript);

const props = defineProps<{
  code: string;
  language?: string;
}>();

const highlightedCode = ref('');

watch(
  () => props.code,
  (newCode) => {
    highlightedCode.value = hljs.highlight(newCode, {
      language: props.language || 'javascript',
    }).value;
  },
  { immediate: true }
);
</script>

<style scoped>
pre {
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 5px;
  overflow: auto;
  white-space: pre-wrap; /* 自动换行 */
  word-wrap: break-word; /* 防止长单词或长字符串超出容器宽度 */
}
</style>
