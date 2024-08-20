<template>
  <v-form ref="formRef" v-bind="$attrs" class="tw-px-8 tw-pt-1 tw-py-12">
    <template v-for="item in formOptions.formItems" :key="item.itemName">
      <div class="tw-flex tw-flex-wrap tw-items-start">
        <div class="tw-mr-2" :style="{ width: item.labelWidth }">
          {{ item.label }}
        </div>
        <div class="tw-flex-1 tw-min-w-[250px]">
          <component
            :is="getComponent(item.itemType)"
            :item="item"
            v-bind="item.props"
            v-on="item.eventHandlers ? item.eventHandlers : {}"
            :rules="formOptions.rules[item.itemName] || []"
            class="tw-flex-grow"
            @update:modelValue="handleModelValueUpdate"
          />
        </div>
      </div>
    </template>
  </v-form>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue';
import type { JpFormOptions } from './type.ts';

// コンポーネントを動的にインポートする関数
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

// プロパティを定義
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

const formRef = ref(null); // フォームの参照
const formData = ref<{ [key: string]: any }>({}); // フォームデータを格納

// モデル値の更新を処理する関数
const handleModelValueUpdate = ({ itemName, value }) => {
  formData.value[itemName] = value;
};

// フォームのバリデーションを行う関数
const validateForm = async () => {
  if (formRef.value) {
    const validationResults = await formRef.value.validate();
    if (validationResults.valid) {
      console.log('フォームは有効です');
      return true;
    } else {
      console.log('フォームは無効です');
      return false;
    }
  }
};

// formRef のインスタンスメソッドを公開
defineExpose({
  validateForm,
  formData,
});
</script>

<style scoped></style>
