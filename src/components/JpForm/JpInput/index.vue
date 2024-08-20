<template>
  <!-- password -->
  <div v-if="item.props.type === 'password'" class="tw-flex">
    <div
      v-if="item.label"
      class="tw-mr-6 tw-mt-[6px]"
      :style="{ width: item.labelWidth }"
    >
      {{ item.label }}
    </div>
    <v-text-field
      :id="item.itemName"
      v-bind="item.props"
      v-model="inputValue"
      :rules="rules"
      @click:append-inner="passwordVisible = !passwordVisible"
      :type="passwordVisible ? 'text' : 'password'"
      :append-inner-icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
    >
    </v-text-field>
  </div>
  <!-- input -->
  <div v-else class="tw-flex">
    <div
      v-if="item.label"
      class="tw-mr-6 tw-mt-[6px]"
      :style="{ width: item.labelWidth }"
    >
      {{ item.label }}
    </div>
    <v-text-field
      :id="item.itemName"
      v-bind="item.props"
      v-model="inputValue"
      :rules="rules"
    >
    </v-text-field>
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

const inputValue = ref(props.item.props.modelValue || '');

const passwordVisible = ref(false);

watch(inputValue, (newValue) => {
  emit('update:modelValue', { itemName: props.item.itemName, value: newValue });
});
</script>
