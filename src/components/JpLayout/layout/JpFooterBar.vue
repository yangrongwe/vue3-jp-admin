<template>
  <div class="tw-flex tw-justify-center tw-align-center tw-mt-8 tw-mb-2">
    {{ footerText }}
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const footerText = ref(import.meta.env.VITE_JP_FOOTER);
</script>
<style lang="scss" scoped>
.v-bottom-navigation {
  height: 42px !important;
}
.v-bottom-navigation--active {
  box-shadow: none !important;
}
.jp-footer {
  background-color: rgb(241 245 249 / var(--tw-bg-opacity));
  align-items: center;
}
</style>
