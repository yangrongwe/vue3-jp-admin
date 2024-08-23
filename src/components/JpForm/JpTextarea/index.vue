<template>
  <div>
    <v-textarea
      v-bind="item.props"
      v-model="textareaValue"
      :rules="rules"
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
const textareaValue = ref(props.item.props.defaultValue || '');

watch(textareaValue, (newValue) => {
  emit('update:modelValue', { itemName: props.item.itemName, value: newValue });
});
</script>

<style scoped></style>
