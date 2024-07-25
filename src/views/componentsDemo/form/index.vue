<script setup lang="ts">
import JpMainArea from '@/components/JpLayout/layout/JpMainArea.vue';
import JpForm from '@/components/JpForm/Form.vue';
import { mainTitle, formRef, formData, formOptions } from './hook.tsx';
</script>

<template>
  <jp-main-area :main-title="mainTitle">
    <template #title>フォームコンポーネントのカプセル化</template>
    <jp-form
      ref="formRef"
      :form-options="formOptions"
      :form-data="formData"
      class="tw-w-[500px]"
    ></jp-form>
  </jp-main-area>
</template>
