<script setup lang="tsx">
import JpMainArea from '@/components/JpLayout/layout/JpMainArea.vue';
import { useOpenModal, mainTitle } from './hook';
</script>

<template>
  <JpMainArea :h-full="true" :mainTitle="mainTitle">
    <div class="tw-my-2">{{ $t('views.modal.basicUsage') }}</div>
    <div class="tw-btn">
      <v-btn @click="useOpenModal(1)">{{
        $t('views.modal.basicModalTsx')
      }}</v-btn>
      <v-btn @click="useOpenModal(2)">{{
        $t('views.modal.basicModalVNode')
      }}</v-btn>
      <v-btn @click="useOpenModal(3)">{{ $t('views.modal.withForm') }}</v-btn>
    </div>
    <div class="tw-my-2">{{ $t('views.modal.attributesSlotsCallbacks') }}</div>
    <div class="tw-btn">
      <v-btn @click="useOpenModal(4)">{{
        $t('views.modal.noMaskModal')
      }}</v-btn>
      <v-btn @click="useOpenModal(5)">{{ $t('views.modal.fullScreen') }}</v-btn>
      <v-btn @click="useOpenModal(6)">{{ $t('views.modal.nested') }}</v-btn>
    </div>
    <div class="tw-btn">
      <v-btn @click="useOpenModal(7)">{{
        $t('views.modal.customHeader')
      }}</v-btn>
      <v-btn @click="useOpenModal(8)">{{
        $t('views.modal.customFooter')
      }}</v-btn>
    </div>
    <div class="tw-btn">
      <v-btn @click="useOpenModal(9)">{{
        $t('views.modal.preventOutsideClose')
      }}</v-btn>
      <v-btn @click="useOpenModal(10)">{{
        $t('views.modal.closeCallback')
      }}</v-btn>
    </div>
    <div class="tw-btn">
      <v-btn @click="useOpenModal(11)">{{
        $t('views.modal.drawerModal.top')
      }}</v-btn>
      <v-btn @click="useOpenModal(12)">{{
        $t('views.modal.drawerModal.right')
      }}</v-btn>
      <v-btn @click="useOpenModal(13)">{{
        $t('views.modal.drawerModal.bottom')
      }}</v-btn>
      <v-btn @click="useOpenModal(14)">{{
        $t('views.modal.drawerModal.left')
      }}</v-btn>
    </div>
    <v-divider class="tw-mb-2"></v-divider>
    <div>
      {{ $t('views.modal.moreUsage') }}:
      <a
        style="color: #409eff"
        class="tw-underline"
        target="_blank"
        href="https://vuetifyjs.com/en/components/dialogs/#api"
      >
        https://vuetifyjs.com/en/components/dialogs/#api</a
      >
    </div>
  </JpMainArea>
</template>

<style lang="scss">
.tw-btn {
  @apply tw-flex tw-mb-6 tw-gap-x-3;
}
</style>
