<template>
    <v-btn @click="openModalHandler">Open Modal</v-btn>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { openModal, closeModal, closeAllModals } from '@/utils/modalUtils'; // 请根据你的实际路径调整
  
  export default defineComponent({
    setup() {
      const openModalHandler = () => {
        openModal(1, {
          maxWidth: '500px',
          persistent: true,
          fullscreen: false,
          scrollable: true,
          transition: 'dialog-bottom-transition',
          // 添加更多的 v-dialog 属性
        });
      };
  
      return {
        openModalHandler,
      };
    },
  });
  </script>
  