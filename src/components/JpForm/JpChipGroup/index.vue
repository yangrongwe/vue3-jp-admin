<template>
  <v-chip-group v-bind="item.props" v-model="chipGroupValue">
    <v-chip
      v-for="chip in item.props.chipGroupArr"
      :text="chip.text"
      :value="chip.value"
    ></v-chip>
  </v-chip-group>
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
const chipGroupValue = ref(props.item.props.defaultValue || []);

watch(chipGroupValue, (newValue) => {
  emit('update:modelValue', { itemName: props.item.itemName, value: newValue });
});
</script>

<style scoped></style>
