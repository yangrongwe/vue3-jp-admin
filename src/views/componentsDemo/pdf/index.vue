<template>
  <jp-main-area :h-full="true">
    <PdfViewer :pdf="url" />
  </jp-main-area>
</template>

<script setup lang="ts">
import JpMainArea from '@/components/JpLayout/layout/JpMainArea.vue';
import PdfViewer from '@/components/JpPdf/index.vue';
const url =
  'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf';
</script>
