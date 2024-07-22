<template>
  <v-card variant="flat">
    <div class="tw-px-4 tw-min-h-16">{{ title }}</div>
    <v-divider></v-divider>
    <div class="tw-p-6">
      <slot></slot>
    </div>
  </v-card>
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string;
}>();
console.log(props);
</script>

<style lang="scss"></style>
