<template>
  <!-- メインコンテンツ領域 -->
  <v-main class="tw-bg-slate-100">
    <!-- コンテンツコンテナ -->
    <div class="tw-px-6 tw-pt-6">
      <!-- Vue Router のビュー コンテナ -->
      <router-view></router-view>
      <jp-footer-bar></jp-footer-bar>
    </div>
  </v-main>
</template>

<script setup lang="ts">
import JpFooterBar from './JpFooterBar.vue';
</script>

<style lang="scss"></style>
