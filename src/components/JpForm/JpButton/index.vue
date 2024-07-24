<!-- JpButton.vue -->
<template>
  <v-btn v-bind="$attrs">{{ item.props.label }} </v-btn>
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
