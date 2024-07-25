import { MainTitle } from '@/types/index';
import { reactive, ref } from 'vue';
import { JpFormOptions } from '@/components/JpForm/type.ts';
const mainTitle: MainTitle = {
  title: 'Vuetify3 フォーム　カプセル化【関数式呼び出し】',
  linkText: 'src/views/componentsDemo/alert/index.vue',
  path: 'https://github.com/yangrongwe/vue3-jp-admin/blob/main/src/views/componentsDemo/alert/index.vue',
};
const formRef = ref(null);

const formData = reactive({
  email: '',
  password: '',
});

const formOptions = reactive<JpFormOptions>({
  formItems: [
    {
      itemType: 'input',
      itemName: 'email',
      label: 'email',
      labelWidth: '80px',
      props: {
        type: 'email',
        modelValue: '',
        placeholder: 'Enter your email',
        prependInnerIcon: 'mdi-email-outline',
        validateOn: 'blur',
      },
      eventHandlers: {
        input: () => {},
      },
    },
    {
      itemType: 'input',
      itemName: 'password',
      label: 'password',
      labelWidth: '80px',
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
        class: 'tw-w-full',
        // block: true,
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

export { mainTitle, formRef, formData, formOptions };
