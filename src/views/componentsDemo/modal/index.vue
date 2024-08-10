<script setup lang="tsx">
import JpMainArea from '@/components/JpLayout/layout/JpMainArea.vue';
import { useOpenModal } from './hook';
</script>

<template>
  <JpMainArea :h-full="true">
    <div class="tw-btn">
      <v-btn @click="useOpenModal(1)">基本modal-tsx写法</v-btn>
      <v-btn @click="useOpenModal(2)">基本modal-VNode写法</v-btn>
      <v-btn @click="useOpenModal(3)">结合Form</v-btn>
    </div>
    <div class="tw-btn">
      <v-btn @click="useOpenModal(4)">无遮罩modal</v-btn>
      <v-btn @click="useOpenModal(5)">全屏</v-btn>
      <v-btn @click="useOpenModal(6)">嵌套</v-btn>
    </div>
    <div class="tw-btn">
      <v-btn @click="useOpenModal(7)">自定义头部</v-btn>
      <v-btn @click="useOpenModal(8)">自定义底部</v-btn>
    </div>
    <div class="tw-btn">
      <v-btn @click="useOpenModal(9)">禁止通过点击外部区域的方式关闭</v-btn>
      <v-btn @click="useOpenModal(10)">关闭后的回调</v-btn>
    </div>
  </JpMainArea>
</template>

<style lang="scss">
.tw-btn {
  @apply tw-flex tw-mb-6 tw-gap-x-3;
}
</style>
