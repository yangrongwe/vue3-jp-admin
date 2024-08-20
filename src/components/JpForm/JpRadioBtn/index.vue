<template>
  <div>
    <v-radio-group
      :id="item.itemName"
      v-bind="item.props"
      v-model="selectedValue"
      :rules="rules"
      @change="handleChange"
    >
      <v-radio
        v-for="(option, index) in item.props.items"
        :key="index"
        :label="option.label"
        :value="option.value"
      />
    </v-radio-group>
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

const selectedValue = ref(props.item.props.modelValue || '');

watch(selectedValue, (newValue) => {
  emit('update:modelValue', { itemName: props.item.itemName, value: newValue });
});

const handleChange = (event) => {
  props.item.eventHandlers.change && props.item.eventHandlers.change(event);
};
</script>

<style scoped></style>
