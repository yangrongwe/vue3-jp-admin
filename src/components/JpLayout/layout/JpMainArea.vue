<template>
  <v-card
    variant="flat"
    :class="hFull ? 'tw-flex tw-flex-col tw-h-full' : 'tw-flex tw-flex-col'"
  >
    <div class="tw-px-4 tw-py-6 tw-min-h-16">
      <!-- 自定义title -->
      <div v-if="$slots.title">
        <slot name="title"></slot>
      </div>
      <!-- title模板 -->
      <div v-if="!$slots.title && mainTitle">
        <div class="tw-text-lg">{{ mainTitle.title }}</div>
        DemoCode：
        <a
          class="tw-text-sm jp-sub-title tw-cursor-pointer"
          target="_blank"
          :href="mainTitle.path"
        >
          {{ mainTitle.linkText }}
        </a>
      </div>
    </div>
    <v-divider></v-divider>
    <div class="tw-p-6 tw-flex-1">
      <slot></slot>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { MainTitle } from '@/types/index';

const props = defineProps<{
  hFull?: boolean;
  mainTitle?: MainTitle;
}>();
</script>

<style lang="scss"></style>
