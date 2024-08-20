<template>
  <!-- select -->
  <div class="tw-flex">
    <div
      v-if="item.label"
      class="tw-mr-6 tw-mt-[12px]"
      :style="{ width: item.labelWidth }"
    >
      {{ item.label }}
    </div>
    <v-select
      :id="item.itemName"
      v-bind="item.props"
      v-model="selectedValue"
      :items="item.props.items"
      :rules="rules"
    >
    </v-select>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

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

const selectedValue = ref(props.item.props.modelValue || undefined);

watch(selectedValue, (newValue) => {
  emit('update:modelValue', { itemName: props.item.itemName, value: newValue });
});
</script>
