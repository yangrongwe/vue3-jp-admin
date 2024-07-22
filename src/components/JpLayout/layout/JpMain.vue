<template>
  <!-- メインコンテンツ領域 -->
  <v-main class="tw-bg-slate-100 tw-flex-col tw-min-h-full">
    <!-- コンテンツコンテナ -->
    <div class="tw-px-6 tw-pt-6 tw-flex tw-flex-col tw-h-full">
      <!-- Vue Router のビュー コンテナ -->
      <div class="tw-flex-grow">
        <router-view></router-view>
      </div>
      <jp-footer-bar class="tw-w-full tw-text-center tw-my-4"></jp-footer-bar>
    </div>
  </v-main>
</template>

<script setup lang="ts">
import JpFooterBar from './JpFooterBar.vue';
</script>

<style lang="scss">
// .v-main {
//   display: flex;
//   flex-direction: column;
//   min-height: 100vh;
// }
</style>
