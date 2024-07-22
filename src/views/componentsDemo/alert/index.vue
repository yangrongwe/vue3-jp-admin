<template>
  <JpMainArea :title="'Vuetify3 Alert 二次封装(函数式调用)'">
    <!-- 这里可以放置具体的内容或其他组件 -->
  </JpMainArea>
</template>

<script setup lang="ts">
import JpMainArea from '@/components/JpLayout/layout/JpMainArea.vue';
import { handleShowAlert, handleClearAllAlerts } from './hook';

// 调用警告显示函数
handleShowAlert();
</script>
