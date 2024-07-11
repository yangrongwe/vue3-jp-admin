<template>
  <!-- メインコンテンツ領域 -->
  <v-main class="tw-bg-slate-100">
    <!-- コンテンツコンテナ -->
    <div class="tw-px-6 tw-pt-6 tw-h-full tw-flex tw-flex-col">
      <!-- Vue Router のビュー コンテナ -->
      <router-view class="tw-flex-grow"></router-view>
      <jp-footer-bar class="tw-flex-grow-0"></jp-footer-bar>
    </div>
  </v-main>
</template>

<script setup lang="ts">
import JpFooterBar from './JpFooterBar.vue';
</script>

<style lang="scss"></style>
