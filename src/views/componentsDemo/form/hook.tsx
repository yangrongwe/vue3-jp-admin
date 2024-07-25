import { MainTitle } from '@/types/index';
import { reactive, ref } from 'vue';
import { JpFormOptions } from '@/components/JpForm/type.ts';

const mainTitle: MainTitle = {
  title: 'Vuetify3 フォーム　カプセル化',
  linkText: 'src/views/componentsDemo/form/index.vue',
  path: 'https://github.com/yangrongwe/vue3-jp-admin/blob/main/src/views/componentsDemo/form/index.vue',
};

const formRef = ref<any>(null);

const formOptions = reactive<JpFormOptions>({
  formItems: [
    // Input item for email
    {
      itemType: 'input',
      itemName: 'email',
      label: '邮箱',
      labelWidth: '80px',
      props: {
        type: 'email',
        placeholder: '请输入邮箱',
        prependInnerIcon: 'mdi-email-outline',
        validateOn: 'blur',
        class: 'tw-mb-1',
      },
      eventHandlers: {
        input: (event: Event) => {
          /* handle input event */
        },
        change: (el: any) => {
          /* handle change event */
        },
      },
    },
    // Input item for password
    {
      itemType: 'input',
      itemName: 'password',
      label: '密码',
      labelWidth: '80px',
      props: {
        type: 'password',
        placeholder: '请输入密码',
        prependInnerIcon: 'mdi-lock-outline',
        class: 'tw-mb-1',
      },
      eventHandlers: {
        change: (el: any) => {
          /* handle change event */
        },
        click: () => {
          /* handle click event */
        },
      },
    },
    // Select item for frontend frameworks
    {
      itemType: 'select',
      itemName: 'frontEnd',
      label: '前端框架',
      labelWidth: '80px',
      props: {
        placeholder: '请选择擅长的前端框架',
        class: 'tw-mb-1',
        items: ['Vue', 'React', 'Angular', 'Jquery'],
        multiple: true,
        clearable: true,
      },
      eventHandlers: {
        'update:modelValue': (value: any) => {
          /* handle update:modelValue event */
        },
        'update:menu': (value: any) => {
          /* handle update:menu event */
        },
      },
    },
    // Autocomplete item
    {
      itemType: 'autoComplete',
      itemName: 'skills',
      label: '技能',
      labelWidth: '80px',
      props: {
        items: ['JavaScript', 'TypeScript', 'Python', 'Java'],
        placeholder: '选择你的技能',
        class: 'tw-mb-1',
      },
      eventHandlers: {
        'update:modelValue': (value: any) => {
          /* handle update:modelValue event */
        },
        'update:input': (value: any) => {
          /* handle update:input event */
        },
      },
    },
    // Radio group item
    {
      itemType: 'radioBtn',
      itemName: 'gender',
      label: '性别',
      labelWidth: '80px',
      props: {
        items: [
          { label: '男', value: 'male' },
          { label: '女', value: 'female' },
        ],
        class: 'tw-mb-1',
      },
      eventHandlers: {
        change: (value: any) => {
          /* handle change event */
        },
      },
    },
    // Range slider item
    {
      itemType: 'rangeSlider',
      itemName: 'ageRange',
      label: '年龄范围',
      labelWidth: '80px',
      props: {
        min: 0,
        max: 100,
        class: 'tw-mb-1',
      },
      eventHandlers: {
        change: (value: any) => {
          /* handle change event */
        },
      },
    },
    // Image item
    {
      itemType: 'image',
      itemName: 'profileImage',
      props: {
        src: 'path/to/image.jpg',
        alt: 'Profile Image',
        class: 'tw-mb-1',
      },
      eventHandlers: {
        // nothing
      },
    },
    // Checkbox item
    {
      itemType: 'checkbox',
      itemName: 'agreeTerms',
      label: '同意条款',
      labelWidth: '80px',
      props: {
        class: 'tw-mb-1',
        label: '我同意条款和条件',
      },
      eventHandlers: {
        change: (el: any) => {
          /* handle change event */
        },
        click: () => {
          /* handle click event */
        },
      },
    },
    // Button item
    {
      itemType: 'button',
      itemName: 'submitButton',
      props: {
        label: '提交',
        color: 'blue',
        size: 'large',
        variant: 'tonal',
        class: 'tw-w-full',
      },
      eventHandlers: {
        click: async () => {
          if (await formRef.value.validateForm()) {
            // 表单验证通过，进行提交操作
            console.log(formRef.value.formData);
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
      (value: any) => !!value || '请输入邮箱',
      (value: any) => /.+@.+\..+/.test(value) || '请输入有效的邮箱地址',
    ],
    password: [
      (value: any) => !!value || '请输入密码',
      (value: any) => (value && value.length >= 6) || '密码长度至少为6个字符',
    ],
    frontEnd: [
      (value: any) =>
        (Array.isArray(value) && value.length > 0) || '请选择至少一个前端框架',
    ],
    agreeTerms: [(value: any) => !!value || '您必须同意条款'],
    gender: [(value: any) => !!value || '请选择性别'],
    ageRange: [(value: any) => value != null || '请选择年龄范围'],
    skills: [
      (value: any) =>
        (Array.isArray(value) && value.length > 0) || '请选择至少一个技能',
    ],
  },
});

export { mainTitle, formRef, formOptions };
