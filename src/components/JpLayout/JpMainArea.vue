<template>
  <div class="tw-h-full">
    <v-card class="tw-h-full jp-main-area" variant="flat">
      <slot></slot>
    </v-card>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss">
  .jp-main-area{
    padding: 24px!important;
  }
</style>

