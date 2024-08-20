<template>
  <div>
    <v-date-picker v-bind="item.props" v-model="dateValue"></v-date-picker>
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
});

const emit = defineEmits(['update:modelValue']);
const dateValue = ref(props.item.props.modelValue || null);

watch(dateValue, (newValue) => {
  emit('update:modelValue', { itemName: props.item.itemName, value: newValue });
});
</script>

<style scoped></style>
