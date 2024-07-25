<!-- JpButton.vue -->
<template>
  <v-img v-bind="item.props"></v-img>
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
