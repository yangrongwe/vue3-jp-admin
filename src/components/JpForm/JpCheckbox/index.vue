<template>
  <!-- checkbox -->
  <div class="tw-flex">
    <div
      v-if="item.label"
      class="tw-mr-6 tw-mt-[16px]"
      :style="{ width: item.labelWidth }"
    >
      {{ item.label }}
    </div>
    <v-checkbox
      :id="item.itemName"
      v-bind="item.props"
      v-model="isChecked"
      :rules="rules"
    />
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

const isChecked = ref(props.item.props.modelValue || false);

watch(isChecked, (newValue) => {
  emit('update:modelValue', { itemName: props.item.itemName, value: newValue });
});
</script>

<style scoped>
/* 你可以根据需要自定义样式 */
</style>
