<script setup lang="ts">
import JpMainArea from '@/components/JpLayout/layout/JpMainArea.vue';
import { handleShowAlert, handleClearAllAlerts, mainTitle } from './hook';
</script>
<template>
  <JpMainArea :h-full="true" :main-title="mainTitle">
    <!-- 这里可以放置具体的内容或其他组件 -->
    <!-- <template #title>
    </template> -->
    <div>
      <div class="tw-mb-4">Base Style</div>

      <div>
        <v-btn
          color="primary"
          variant="outlined"
          class="tw-mr-4"
          @click="handleShowAlert(1)"
          >Default</v-btn
        >
        <v-btn
          color="primary"
          variant="outlined"
          class="tw-mr-4"
          @click="handleShowAlert(2)"
          >Outlined</v-btn
        >
        <v-btn color="primary" variant="outlined" @click="handleShowAlert(3)"
          >Tonal</v-btn
        >
      </div>
      <!-- different Type -->
      <div class="tw-my-4">Different Type</div>

      <div>
        <v-btn
          color="primary"
          variant="outlined"
          class="tw-mr-4"
          @click="handleShowAlert(4)"
          >Primary</v-btn
        >
        <v-btn
          color="primary"
          variant="outlined"
          class="tw-mr-4"
          @click="handleShowAlert(5)"
          >Success</v-btn
        >
        <v-btn
          color="primary"
          variant="outlined"
          class="tw-mr-4"
          @click="handleShowAlert(6)"
          >Warning</v-btn
        >
        <v-btn
          color="primary"
          variant="outlined"
          class="tw-mr-4"
          @click="handleShowAlert(7)"
          >Error</v-btn
        >
      </div>

      <div class="tw-my-4">Timeout Close</div>

      <div>
        <v-btn
          color="primary"
          variant="outlined"
          class="tw-mr-4"
          @click="handleShowAlert(8)"
          >3S Auto Close</v-btn
        >
      </div>
      <v-divider class="tw-my-4"></v-divider>
      <!-- Other -->
      <div>
        <div>本页面演示函数调用v-alert。</div>
        <a
          class="tw-text-sm tw-text-red-500 tw-cursor-pointer"
          target="_blank"
          href="https://vuetifyjs.com/en/api/v-alert/#props"
        >
          Other 设置，请参照vuetify文档
        </a>
      </div>
    </div>
  </JpMainArea>
</template>
