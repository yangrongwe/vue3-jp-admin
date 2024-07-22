<template>
  <!-- <JpMainArea>
    <div>Vuetify3 Alert 二次封装(函数式调用)</div>
  </JpMainArea> -->
</template>
<script setup lang="ts">
import JpMainArea from './../../../components/JpLayout/layout/JpMainArea.vue';
import { handleShowAlert, handleClearAllAlerts } from './hook';
handleShowAlert();
</script>
