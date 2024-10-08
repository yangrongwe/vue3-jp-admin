// src/hooks/searchHook.ts
import { ref, reactive } from 'vue';
import { MainTitle } from '@/types/index';
import { JpSearchOptions } from '@/components/JpSearch/type.ts';
import { VCard } from 'vuetify/components';
import { $t } from '@/plugins/i18n/i18nUtils';

const mainTitle: MainTitle = {
  title: $t('title.components.search'),
  linkText: 'src/views/componentsDemo/search/index.vue',
  path: 'https://github.com/yangrongwe/vue3-jp-admin/blob/main/src/views/componentsDemo/search/index.vue',
};

const searchRef = ref<any>(null);

const searchOptions = reactive<JpSearchOptions>({
  searchMaxWidth: "1000px",

  searchItems: [
    // フロントエンドフレームワーク用のセレクト項目
    {
      itemType: 'select',
      itemName: 'frontEnd',
      label: $t('views.form.frontEnd.label'),
      labelWidth: '100px',
      props: {
        placeholder: $t('views.form.frontEnd.placeholder'),
        class: 'tw-mb-1',
        items: ['Vue', 'React', 'Angular', 'Jquery'],
        multiple: true,
        clearable: true,
        width: '200px'
      },
      eventHandlers: {
        'update:modelValue': (value) => {
          // update:modelValue イベントを処理
        },
        'update:menu': (value) => {
          // update:menu イベントを処理
        },
      },
    },
    // メールアドレス用の入力項目
    {
      itemType: 'input',
      itemName: 'email',
      label: $t('views.form.email.label'),
      labelWidth: '100px',
      props: {
        type: 'email',
        placeholder: $t('views.form.email.placeholder'),
        prependInnerIcon: 'mdi-email-outline',
        class: 'tw-mb-1',
        width: '200px',
      },
      eventHandlers: {
        input: (event) => {
          // 入力イベントを処理
        },
        change: (el) => {
          // 変更イベントを処理
        },
      },
    },


    // 自動補完用の項目
    {
      itemType: 'autoComplete',
      itemName: 'skills',
      label: $t('views.form.skills.label'),
      labelWidth: '100px',
      props: {
        items: ['JavaScript', 'TypeScript', 'Python', 'Java'],
        placeholder: $t('views.form.skills.placeholder'),
        class: 'tw-mb-1',
        width: '200px'
      },
      eventHandlers: {
        'update:modelValue': (value) => {
          // update:modelValue イベントを処理
        },
        'update:input': (value) => {
          // update:input イベントを処理
        },
      },
    },
    // パスワード用の入力項目
    {
      itemType: 'input',
      itemName: 'password',
      label: $t('views.form.password.label'),
      labelWidth: '100px',
      props: {
        placeholder: $t('views.form.password.placeholder'),
        prependInnerIcon: 'mdi-lock-outline',
        class: 'tw-mb-1',
        width: '200px'
      },
      eventHandlers: {
        change: (el) => {
          // 変更イベントを処理
        },
        click: () => {
          // クリックイベントを処理
        },
      },
    },
    // ラジオボタン用の項目
    {
      itemType: 'radioBtn',
      itemName: 'gender',
      label: $t('views.form.gender.label'),
      labelWidth: '100px',
      props: {
        items: [
          { label: $t('views.form.gender.male'), value: 'male' },
          { label: $t('views.form.gender.female'), value: 'female' },
        ],
        class: 'tw-mb-1',
        inline: true
      },
      eventHandlers: {
        change: (value) => {
          // 変更イベントを処理
        },
      },
    },
    // // 時間選択用の項目
    // {
    //   itemType: 'timePicker',
    //   itemName: 'reminderTime',
    //   label: $t('views.form.reminderTime.label'),
    //   labelWidth: '100px',
    //   props: {
    //     type: 'dateTime',
    //     placeholder: $t('views.form.reminderTime.placeholder'),
    //     class: 'tw-mb-1',
    //     width: '170px'
    //   },
    //   eventHandlers: {
    //     change: (value) => {
    //       // 変更イベントを処理
    //     },
    //   },
    // },

  ],
  rules: {
    email: [
      (value: any) => !!value || $t('views.form.email.validation.required'),
      (value: any) =>
        /.+@.+\..+/.test(value) || $t('views.form.email.validation.invalid'),
    ],
    password: [
      (value: any) => !!value || $t('views.form.password.validation.required'),
      (value: any) =>
        (value && value.length >= 6) ||
        $t('views.form.password.validation.length'),
    ],
    frontEnd: [
      (value: any) =>
        (value && value.length > 0) ||
        $t('views.form.frontEnd.validation.required'),
    ],
    agreeTerms: [
      (value: any) =>
        !!value || $t('views.form.agreeTerms.validation.required'),
    ],
    gender: [
      (value: any) => !!value || $t('views.form.gender.validation.required'),
    ],
    ageRange: [
      (value: any) =>
        value != null || $t('views.form.ageRange.validation.required'),
    ],
    skills: [
      (value: any) =>
        (value && value.length > 0) ||
        $t('views.form.skills.validation.required'),
    ],
  },
});

const search = () => {
  alert("------------------search success-------------------")
}
export { mainTitle, searchRef, searchOptions, search };
