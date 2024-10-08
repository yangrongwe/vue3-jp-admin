<template>
  <div class="tw-flex">
    <v-form
      ref="searchRef"
      v-bind="$attrs"
      class="tw-flex tw-flex-wrap tw-gap-x-[12px]"
      :style="{
        maxWidth: searchOptions.searchMaxWidth,
      }"
      validate-on="submit lazy"
    >
      <template v-for="item in searchOptions.searchItems" :key="item.itemName">
        <div class="tw-flex">
          <div
            class="tw-flex tw-flex-row-reverse tw-mx-2 tw-items-center"
            :style="{ height: '40px', width: item.labelWidth }"
          >
            {{ item.label }}
          </div>
          <div>
            <component
              :resetFlag="resetFlag"
              :is="getComponent(item.itemType)"
              :item="item"
              v-bind="item.props"
              v-on="item.eventHandlers ? item.eventHandlers : {}"
              @update:modelValue="handleModelValueUpdate"
              :rules="searchOptions.rules[item.itemName] || []"
            />
          </div>
        </div>
      </template>
    </v-form>

    <div class="tw-w-[200px] tw-flex tw-gap-x-[12px]">
      <v-btn
        color="gray"
        variant="tonal"
        style="height: 40px; width: 100px"
        @click="reset"
      >
        {{ t('views.search.reset') }}</v-btn
      >
      <v-btn
        variant="tonal"
        style="height: 40px; width: 100px"
        @click="validateSearch"
        >{{ t('views.search.searchBtn') }}</v-btn
      >
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { ref, defineAsyncComponent, onMounted, getCurrentInstance } from 'vue';
import type { JpSearchOptions } from './type.ts';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const emit = defineEmits(['search']);
// コンポーネントを動的にインポートする関数
const getComponent = (type: string) => {
  const components = {
    customEl: defineAsyncComponent(
      () => import('../JpForm/JpCustomEl/index.vue')
    ),
    autoComplete: defineAsyncComponent(
      () => import('../JpForm/JpAutoComplete/index.vue')
    ),
    button: defineAsyncComponent(() => import('../JpForm/JpButton/index.vue')),
    checkbox: defineAsyncComponent(
      () => import('../JpForm/JpCheckbox/index.vue')
    ),
    input: defineAsyncComponent(() => import('../JpForm/JpInput/index.vue')),
    radioBtn: defineAsyncComponent(
      () => import('../JpForm/JpRadioBtn/index.vue')
    ),
    rangeSlider: defineAsyncComponent(
      () => import('../JpForm/JpRangeSlider/index.vue')
    ),
    datePicker: defineAsyncComponent(
      () => import('../JpForm/JpDatePicker/index.vue')
    ),
    timePicker: defineAsyncComponent(
      () => import('../JpForm/JpTimePicker/index.vue')
    ),
    image: defineAsyncComponent(() => import('../JpForm/JpImage/index.vue')),
    select: defineAsyncComponent(() => import('../JpForm/JpSelect/index.vue')),
    switch: defineAsyncComponent(() => import('../JpForm/JpSwitch/index.vue')),
    textarea: defineAsyncComponent(
      () => import('../JpForm/JpTextarea/index.vue')
    ),
    chipGroup: defineAsyncComponent(
      () => import('../JpForm/JpChipGroup/index.vue')
    ),
    colorPicker: defineAsyncComponent(
      () => import('../JpForm/JpColorPicker/index.vue')
    ),
  };
  return components[type] || null;
};

// プロパティを定義
const props = defineProps({
  searchOptions: {
    type: Object as () => JpSearchOptions,
    default: () => ({
      type: 'vuetify',
      searchItems: [],
      rules: [],
    }),
  },
});

const searchRef = ref(null); // フォームの参照+
const searchData = ref<{ [key: string]: any }>({}); // フォームデータを格納
// モデル値の更新を処理する関数
const handleModelValueUpdate = ({ itemName, value }) => {
  searchData.value[itemName] = value;
};

// フォームのバリデーションを行う関数
const validateSearch = async () => {
  if (searchRef.value) {
    const validationResults = await searchRef.value.validate();
    if (validationResults.valid) {
      console.log('フォームは有効です');
      emit('search');
      return true;
    } else {
      console.log('フォームは無効です');
      return false;
    }
  }
};
const resetFlag = ref(false);
const reset = () => {
  resetFlag.value = true;
  resetFlag.value = false;
};
const initData = () => {
  props.searchOptions.searchItems.map((item) => {
    handleModelValueUpdate({
      itemName: item.itemName,
      value: item.props.defaultValue ? item.props.defaultValue : null,
    });
  });
};

onMounted(() => {
  initData();
});
// searchRef のインスタンスメソッドを公開
defineExpose({
  searchData,
});
</script>
  
  <style scoped></style>
  