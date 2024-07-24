<template>
  <jp-main-area>
    <jp-form
      ref="formRef"
      :form-options="formOptions"
      :form-data="formData"
    ></jp-form>
  </jp-main-area>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { JpFormOptions } from '@/components/JpForm/type.ts';
import JpMainArea from '@/components/JpLayout/layout/JpMainArea.vue';
import JpForm from '@/components/JpForm/Form.vue';

const formRef = ref(null);

const formData = reactive({
  email: '',
  password: '',
});

const formOptions = reactive<JpFormOptions>({
  type: 'vuetify',
  formItems: [
    {
      itemType: 'input',
      itemName: 'email',
      props: {
        type: 'email',
        modelValue: '',
        label: 'email',
        placeholder: 'Enter your email',
        prependInnerIcon: 'mdi-email-outline',
        class: 'tw-mb-2',
      },
      eventHandlers: {
        input: () => {},
      },
    },
    {
      itemType: 'input',
      itemName: 'password',
      props: {
        type: 'password',
        modelValue: '',
        placeholder: 'Enter your password',
        prependInnerIcon: 'mdi-lock-outline',
      },
      eventHandlers: {
        blur: (el) => {
          formData.password = el.srcElement._value;
        },
        click: () => {
          // alert(123);
        },
      },
    },
    {
      itemType: 'button',
      itemName: 'button',
      props: {
        label: 'submit',
        color: 'blue',
        size: 'large',
        variant: 'tonal',
        block: true,
      },
      eventHandlers: {
        click: async () => {
          if (await formRef.value.validateForm()) {
            // 表单验证通过，进行提交操作
            console.log('Form submitted:', formData);
          } else {
            // 表单验证失败
            console.log('Form validation failed');
          }
        },
      },
    },
  ],
  rules: {
    email: [
      (value) => {
        if (value) return true;
        return 'You must enter a first name.';
      },
    ],
  },
});
</script>
