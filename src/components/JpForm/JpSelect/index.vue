<template>
  <v-select
    v-model="item.modelValue"
    :items="item.items"
    :label="item.label"
    :placeholder="item.placeholder"
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
