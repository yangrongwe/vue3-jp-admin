<template>
  <v-radio-group
    v-model="item.modelValue"
    :label="item.label"
    class="tw-w-full"
  >
    <v-radio
      v-for="option in item.options"
      :key="option.value"
      :label="option.label"
      :value="option.value"
    />
  </v-radio-group>
</template>

<script setup lang="ts">
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>
