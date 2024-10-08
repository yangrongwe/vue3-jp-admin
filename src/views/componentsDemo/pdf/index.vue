<script setup lang="ts">
import { ref } from 'vue';
import JpMainArea from '@/components/JpLayout/layout/JpMainArea.vue';
import PdfViewer from '@/components/JpPdf/index.vue';
import pdfUrl from '@/assets/helloworld.pdf';
import { mainTitle } from './hook';
const url = ref<string>(pdfUrl);
const pdfName = ref<string>('demo.pdf');
</script>

<template>
  <jp-main-area :h-full="true" :main-title="mainTitle">
    <PdfViewer :pdfUrl="url" :pdfName="pdfName" :initialZoom="100" />
  </jp-main-area>
</template>
