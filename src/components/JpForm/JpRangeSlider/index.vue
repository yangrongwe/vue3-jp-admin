<template>
  <div>
    <v-range-slider
      :id="item.itemName"
      v-bind="item.props"
      v-model="rangeValue"
      :rules="rules"
      @change="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  rules: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['update:modelValue']);

const rangeValue = ref(props.item.props.defaultValue || [0, 100]);

watch(rangeValue, (newValue) => {
  emit('update:modelValue', { itemName: props.item.itemName, value: newValue });
});

const handleChange = (event) => {
  props.item.eventHandlers.change && props.item.eventHandlers.change(event);
};
</script>

<style scoped></style>
