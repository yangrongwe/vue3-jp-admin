<!-- JpButton.vue -->
<template>
  <v-img v-bind="$attrs"></v-img>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
/* Add your custom styles here */
</style>
