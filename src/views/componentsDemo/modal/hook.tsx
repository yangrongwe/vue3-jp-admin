import { openModal, closeModal, closeAllModals } from '@/utils/modalUtils';
import MyComponent from './MyComponent.vue';
import JpForm from '@/components/JpForm/index.vue';
import { reactive, ref } from 'vue';
import { JpFormOptions } from '@/components/JpForm/type.ts';
import { $t } from '@/plugins/i18n/i18nUtils';
import HighlightCode from './HighlightCode.vue';
const tsxCode = `
  // use method
  openModal(
    <HighlightCode code={tsxCode} />,
    { title: 'TSX Modal', width: '600' }
  );
`;
const opacityCode = `
  // use method
  // 注意：此处只是透明度为0，遮罩并未消失。因此依然不能点击页面的其他元素。
   openModal(
      <HighlightCode code={opacityCode} />, {
        title: '无遮罩 Modal',
        width: '600',
        persistent: true,
        opacity: 0,
    });
`;

const fullscreenCode = `
  // use method
   openModal(
      <HighlightCode code={opacityCode} />, {
        title: 'fullscreen Modal',
        fullscreen: true,
        transition: 'slide-x-reverse-transition',
    });
`;
const formRef = ref(null);
const useOpenModal = (action: number) => {
  switch (action) {
    case 1:
      openModal(<HighlightCode code={tsxCode} />, {
        title: 'TSX Modal',
        width: '600',
      });
      break;
    case 2:
      openModal(MyComponent, {
        title: 'VNode Modal',
        width: '600',
      });
      break;
    case 3:
      openModal(
        <JpForm
          ref={formRef.value}
          form-options={formOptions}
          class="tw-pb-0"
        ></JpForm>,
        {
          title: 'Form Modal',
          width: '800',
        }
      );
      break;
    case 4:
      openModal(<HighlightCode code={opacityCode} />, {
        title: '无遮罩 Modal',
        width: '600',
        persistent: true,
        opacity: 0,
      });
      break;
    case 5:
      openModal(
        <HighlightCode code={fullscreenCode} />,
        {
          title: 'fullscreen Modal',
          fullscreen: true,
          transition: 'slide-x-reverse-transition',
        },
        {
          // titleSlot: <div>123213</div>,
        }
      );
      break;
    case 6:
      break;
    case 7:
      break;
    case 8:
      break;
    case 9:
      break;
    case 10:
      break;
    case 11:
      break;
    default:
      break;
  }
};

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
  ],
  rules: {},
});

export { useOpenModal };
