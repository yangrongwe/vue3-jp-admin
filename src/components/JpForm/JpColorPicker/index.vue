<template>
  <v-color-picker
    v-bind="item.props"
    v-model="colorValue"
    :rules="rules"
    class="tw-mt-4"
  >
  </v-color-picker>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    required: true,
    default: () => ({}),
  },
  rules: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['update:modelValue']);
const colorValue = ref(props.item.props.defaultValue || '');

watch(colorValue, (newValue) => {
  emit('update:modelValue', { itemName: props.item.itemName, value: newValue });
});
</script>

<style scoped></style>
