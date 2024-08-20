<!-- JpDateTimePicker.vue -->
<template>
  <div class="tw-flex tw-space-x-2">
    <div
      v-if="item.label"
      class="tw-mr-6 tw-mt-[12px]"
      :style="{ width: item.labelWidth }"
    >
      {{ item.label }}
    </div>
    <v-text-field
      v-bind="item.props"
      v-model="dateValue"
      type="date"
      class="tw-w-1/2"
    ></v-text-field>
    <v-text-field
      v-bind="item.props"
      v-model="timeValue"
      type="time"
      class="tw-w-1/2"
    ></v-text-field>
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
const dateValue = ref(props.item.props.modelValue?.date || null);
const timeValue = ref(props.item.props.modelValue?.time || null);

watch([dateValue, timeValue], ([newDate, newTime]) => {
  emit('update:modelValue', {
    itemName: props.item.itemName,
    value: { date: newDate, time: newTime },
  });
});
</script>

<style scoped></style>
