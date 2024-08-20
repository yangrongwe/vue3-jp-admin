<!-- JpDateTimePicker.vue -->
<template>
  <div class="tw-flex">
    <div class="tw-flex tw-gap-2">
      <v-text-field
        v-bind="item.props"
        v-model="dateValue"
        type="date"
        class="tw-flex-none"
      ></v-text-field>
      <v-text-field
        v-bind="item.props"
        v-model="timeValue"
        type="time"
        class="tw-flex-none"
      ></v-text-field>
    </div>
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
