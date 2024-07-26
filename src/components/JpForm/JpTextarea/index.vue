<template>
  <div class="tw-flex">
    <div v-if="item.label" class="tw-mr-6" :style="{ width: item.labelWidth }">
      {{ item.label }}
    </div>
    <v-textarea
      v-bind="item.props"
      v-model="textareaValue"
      :rules="rules"
      variant="outlined"
      density="comfortable"
    ></v-textarea>
  </div>
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
const textareaValue = ref(props.item.props.modelValue || '');

watch(textareaValue, (newValue) => {
  emit('update:modelValue', { itemName: props.item.itemName, value: newValue });
});
</script>

<style scoped></style>
