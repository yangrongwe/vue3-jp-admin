<template>
  <v-form ref="formRef" v-bind="$attrs" class="tw-px-8 tw-pt-1 tw-py-12">
    <template v-for="item in formOptions.formItems" :key="item.itemName">
      <component
        :is="getComponent(item.itemType)"
        :item="item"
        v-bind="item.props"
        v-on="item.eventHandlers"
        :rules="formOptions.rules[item.itemName] || []"
        class="tw-flex-grow"
        @update:modelValue="handleModelValueUpdate"
      />
    </template>
  </v-form>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue';
import type { JpFormOptions } from './type.ts';

// 动态导入子组件
const getComponent = (type: string) => {
  const components = {
    customEl: defineAsyncComponent(() => import('./JpCustomEl/index.vue')),
    autoComplete: defineAsyncComponent(
      () => import('./JpAutoComplete/index.vue')
    ),
    button: defineAsyncComponent(() => import('./JpButton/index.vue')),
    checkbox: defineAsyncComponent(() => import('./JpCheckbox/index.vue')),
    input: defineAsyncComponent(() => import('./JpInput/index.vue')),
    radioBtn: defineAsyncComponent(() => import('./JpRadioBtn/index.vue')),
    rangeSlider: defineAsyncComponent(
      () => import('./JpRangeSlider/index.vue')
    ),
    datePicker: defineAsyncComponent(() => import('./JpDatePicker/index.vue')),
    timePicker: defineAsyncComponent(() => import('./JpTimePicker/index.vue')),
    image: defineAsyncComponent(() => import('./JpImage/index.vue')),
    select: defineAsyncComponent(() => import('./JpSelect/index.vue')),
    switch: defineAsyncComponent(() => import('./JpSwitch/index.vue')),
    textarea: defineAsyncComponent(() => import('./JpTextarea/index.vue')),
  };
  return components[type] || null;
};

const props = defineProps({
  formOptions: {
    type: Object as () => JpFormOptions,
    default: () => ({
      type: 'vuetify',
      formItems: [],
      rules: [],
    }),
  },
});

const formRef = ref(null);
const formData = ref<{ [key: string]: any }>({});
const handleModelValueUpdate = ({ itemName, value }) => {
  formData.value[itemName] = value;
};

const validateForm = async () => {
  if (formRef.value) {
    const validationResults = await formRef.value.validate();
    if (validationResults.valid) {
      console.log('Form is valid');
      return true;
    } else {
      console.log('Form is invalid');
      return false;
    }
  }
};
// 暴露 formRef 实例方法
defineExpose({
  validateForm,
  formData,
});
</script>

<style scoped></style>
