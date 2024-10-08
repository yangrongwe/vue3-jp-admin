<script setup lang="ts">
import JpMainArea from '@/components/JpLayout/layout/JpMainArea.vue';
import JpSearch from '@/components/JpSearch/index.vue';
import { mainTitle, searchRef, searchOptions, search } from './hook.tsx';
</script>

<template>
  <jp-main-area :main-title="mainTitle">
    <jp-search
      ref="searchRef"
      :search-options="searchOptions"
      @search="search"
    ></jp-search>
  </jp-main-area>
</template>
