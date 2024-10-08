<template>
  <div>
    <a
      href="https://beian.miit.gov.cn/"
      target="_blank"
      class="tw-text-sm tw-text-slate-500"
      >{{ footerText }}</a
    >
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const footerText = ref(
  'Copyright(C)Since2024 无锡青口网络科技有限公司 苏ICP备2022045507号-1'
);
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
