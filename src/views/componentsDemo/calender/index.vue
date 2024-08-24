<template>
  <jp-main-area :h-full="true">
    <JpCalender
      @customTitle="customTitle"
      @customContent="customContent"
    ></JpCalender>
  </jp-main-area>
</template>

<script setup lang="tsx">
import JpMainArea from '@/components/JpLayout/layout/JpMainArea.vue';
import JpCalender from '@/components/JpCalender/index.vue';
const customTitle = (titleData: string, callback) => {
  callback(`<div>${titleData}</div>`);
};
const customContent = (contentData: string, callback) => {
  callback(`<div>${contentData}</div>`);
};
</script>
