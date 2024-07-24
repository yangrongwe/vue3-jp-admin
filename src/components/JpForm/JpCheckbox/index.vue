<template>
  <v-checkbox v-model="item.modelValue" :label="item.label" class="tw-w-full" />
</template>

<script setup lang="ts">
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>
