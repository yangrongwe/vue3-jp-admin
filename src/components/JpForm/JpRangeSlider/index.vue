<template>
  <v-range-slider
    v-model="item.modelValue"
    :label="item.label"
    :min="item.min"
    :max="item.max"
    class="tw-w-full"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>
