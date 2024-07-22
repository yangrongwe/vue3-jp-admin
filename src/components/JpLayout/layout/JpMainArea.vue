<template>
  <v-card variant="flat" :class="hFull ? 'tw-h-full' : ''">
    <div class="tw-px-4 tw-py-6 tw-min-h-16">
      <!-- 自定义title -->
      <div v-if="$slots.title">
        <slot name="title"></slot>
      </div>
      <!-- title模板 -->
      <div v-if="!$slots.title">
        <div class="tw-text-lg">{{ mainTitle.title }}</div>
        demo位置：
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
    <div class="tw-p-6">
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
