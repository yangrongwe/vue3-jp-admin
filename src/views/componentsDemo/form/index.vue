<script setup lang="ts">
import JpMainArea from '@/components/JpLayout/layout/JpMainArea.vue';
import JpForm from '@/components/JpForm/Form.vue';
import { mainTitle, formRef, formOptions } from './hook.tsx';
</script>

<template>
  <jp-main-area :main-title="mainTitle">
    <jp-form
      ref="formRef"
      :form-options="formOptions"
      class="tw-max-w-[700px]"
    ></jp-form>
  </jp-main-area>
</template>
