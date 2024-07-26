<!-- JpCustomEl.vue -->
<template>
  <div>
    <!-- 直接渲染 customContent -->
    <component :is="customContent" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType, VNode } from 'vue';

const props = defineProps({
  customContent: {
    type: [Object, String, Function] as PropType<VNode | JSX.Element>,
    default: null,
  },
});
</script>

<style scoped>
/* Add your custom styles here */
</style>
