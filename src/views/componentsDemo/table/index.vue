<template>
  <jp-main-area :h-full="true">
    <div>
      <h1 class="text-3xl font-bold underline">Table</h1>
    </div>
    <div>
      <vxe-grid v-bind="gridOptions"></vxe-grid>
    </div>
  </jp-main-area>
</template>

<script setup lang="ts">
import JpMainArea from '@/components/JpLayout/layout/JpMainArea.vue';
import { gridOptions } from './hook.tsx';
</script>
