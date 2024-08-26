<!-- JpDateTimePicker.vue -->
<template>
  <div class="tw-flex">
    <div
      class="tw-flex tw-gap-2 tw-flex-wrap"
      v-if="item.props.type == 'dateTime'"
    >
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
        step="60"
      ></v-text-field>
    </div>

    <div
      class="tw-flex tw-gap-2 tw-flex-wrap"
      v-if="item.props.type == 'timeRange'"
    >
      <v-text-field
        label="开始时间"
        v-bind="item.props"
        v-model="startTime"
        type="time"
        class="tw-flex-none"
      ></v-text-field>
      <div>-</div>
      <v-text-field
        label="结束时间"
        v-bind="item.props"
        v-model="endTime"
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
const dateValue = ref(props.item.props.defaultValue?.date || null);
const timeValue = ref(props.item.props.defaultValue?.time || null);

const startTime = ref(props.item.props.defaultValue?.startTime || null);
const endTime = ref(props.item.props.defaultValue?.endTime || null);

watch([dateValue, timeValue], ([newDate, newTime]) => {
  emit('update:modelValue', {
    itemName: props.item.itemName,
    value: { date: newDate, time: newTime },
  });
});

watch([startTime, endTime], ([newStartTime, newEndTime]) => {
  emit('update:modelValue', {
    itemName: props.item.itemName,
    value: { startTime: newStartTime, endTime: newEndTime },
  });
});
</script>

<style scoped></style>
