// src/hooks/formHook.ts
import { ref, reactive } from 'vue';
import { MainTitle } from '@/types/index';
import { JpFormOptions } from '@/components/JpForm/type.ts';
import { VCard } from 'vuetify/components';
import { $t } from '@/plugins/i18n/i18nUtils';

const mainTitle: MainTitle = {
  title: $t('title.components.form'),
  linkText: 'src/views/componentsDemo/form/index.vue',
  path: 'https://github.com/yangrongwe/vue3-jp-admin/blob/main/src/views/componentsDemo/form/index.vue',
};

const formRef = ref<any>(null);

const formOptions = reactive<JpFormOptions>({
  formItems: [
    // メールアドレス用の入力項目
    {
      itemType: 'input',
      itemName: 'email',
      label: $t('views.form.email.label'),
      labelWidth: '150px',
      props: {
        type: 'email',
        placeholder: $t('views.form.email.placeholder'),
        prependInnerIcon: 'mdi-email-outline',
        validateOn: 'blur',
        class: 'tw-mb-1',
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
    // パスワード用の入力項目
    {
      itemType: 'input',
      itemName: 'password',
      label: $t('views.form.password.label'),
      labelWidth: '150px',
      props: {
        type: 'password',
        placeholder: $t('views.form.password.placeholder'),
        prependInnerIcon: 'mdi-lock-outline',
        class: 'tw-mb-1',
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
    // フロントエンドフレームワーク用のセレクト項目
    {
      itemType: 'select',
      itemName: 'frontEnd',
      label: $t('views.form.frontEnd.label'),
      labelWidth: '150px',
      props: {
        placeholder: $t('views.form.frontEnd.placeholder'),
        class: 'tw-mb-1',
        items: ['Vue', 'React', 'Angular', 'Jquery'],
        multiple: true,
        clearable: true,
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
    // 自動補完用の項目
    {
      itemType: 'autoComplete',
      itemName: 'skills',
      label: $t('views.form.skills.label'),
      labelWidth: '150px',
      props: {
        items: ['JavaScript', 'TypeScript', 'Python', 'Java'],
        placeholder: $t('views.form.skills.placeholder'),
        class: 'tw-mb-1',
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
    // 時間選択用の項目
    {
      itemType: 'timePicker',
      itemName: 'reminderTime',
      label: $t('views.form.reminderTime.label'),
      labelWidth: '150px',
      props: {
        placeholder: $t('views.form.reminderTime.placeholder'),
        class: 'tw-mb-1',
      },
      eventHandlers: {
        change: (value) => {
          // 変更イベントを処理
        },
      },
    },
    // 日付選択用の項目
    {
      itemType: 'datePicker',
      itemName: 'birthDate',
      label: $t('views.form.birthDate.label'),
      labelWidth: '150px',
      props: {
        placeholder: $t('views.form.birthDate.placeholder'),
        class: 'tw-mb-1',
      },
      eventHandlers: {
        change: (value) => {
          // 変更イベントを処理
        },
      },
    },
    // ラジオボタン用の項目
    {
      itemType: 'radioBtn',
      itemName: 'gender',
      label: $t('views.form.gender.label'),
      labelWidth: '150px',
      props: {
        items: [
          { label: $t('views.form.gender.male'), value: 'male' },
          { label: $t('views.form.gender.female'), value: 'female' },
        ],
        class: 'tw-mb-1',
      },
      eventHandlers: {
        change: (value) => {
          // 変更イベントを処理
        },
      },
    },
    // レンジスライダー用の項目
    {
      itemType: 'rangeSlider',
      itemName: 'ageRange',
      label: $t('views.form.ageRange.label'),
      labelWidth: '150px',
      props: {
        min: 0,
        max: 100,
        class: 'tw-mb-1',
      },
      eventHandlers: {
        change: (value) => {
          // 変更イベントを処理
        },
      },
    },

    // スイッチ用の項目
    {
      itemType: 'switch',
      itemName: 'newsletter',
      label: $t('views.form.newsletter.label'),
      labelWidth: '150px',
      props: {
        class: 'tw-mb-1',
      },
      eventHandlers: {
        change: (el) => {
          // 変更イベントを処理
        },
      },
    },

    // テキストエリア用の項目
    {
      itemType: 'textarea',
      itemName: 'description',
      label: $t('views.form.description.label'),
      labelWidth: '150px',
      props: {
        placeholder: $t('views.form.description.placeholder'),
        class: 'tw-mb-1',
      },
      eventHandlers: {
        input: (event) => {
          // 入力イベントを処理
        },
      },
    },
    // チェックボックス用の項目
    {
      itemType: 'checkbox',
      itemName: 'agreeTerms',
      props: {
        label: $t('views.form.agreeTerms.checkboxLabel'),
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
    // カスタム要素用の項目
    {
      itemType: 'customEl',
      itemName: 'memo',
      label: $t('views.form.memo.label'),
      labelWidth: '150px',
      props: {
        placeholder: $t('views.form.memo.placeholder'),
        class: 'tw-mb-4',
        customContent: (
          <VCard
            class="tw-h-24 tw-p-2 tw-bg-slate-100"
            variant="outlined"
            density="comfortable"
          >
            <div>{$t('views.form.memo.customContent.cardContent.0')}</div>
            <div>{$t('views.form.memo.customContent.cardContent.1')}</div>
            <div>{$t('views.form.memo.customContent.cardContent.2')}</div>
          </VCard>
        ),
      },
      eventHandlers: {
        // カスタム要素のイベントを処理
      },
    },

    // ボタン用の項目
    {
      itemType: 'button',
      itemName: 'submitButton',
      props: {
        label: $t('views.form.submitButton.label'),
        color: 'blue',
        size: 'large',
        variant: 'tonal',
        class: 'tw-w-full',
      },
      eventHandlers: {
        click: async () => {
          if (await formRef.value.validateForm()) {
            // フォームが有効な場合、提出処理を行う
            console.log(formRef.value.formData);
            // showAlert({
            //   message: $t('views.form.submitButton.alert.message'),
            //   // timeout: 3000,
            //   props: {
            //     type: $t('views.form.submitButton.alert.type'),
            //     closable: $t('views.form.submitButton.alert.closable'),
            //     border: $t('views.form.submitButton.alert.border'),
            //     borderColor: $t('views.form.submitButton.alert.borderColor'),
            //   },
            // });
          } else {
            // フォームが無効な場合
            console.log('Form validation failed');
          }
        },
      },
    },
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

export { mainTitle, formRef, formOptions };
