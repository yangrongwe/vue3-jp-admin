import { openModal, closeModal, closeAllModals } from '@/utils/modalUtils';
import MyComponent from './MyComponent.vue';
import JpForm from '@/components/JpForm/index.vue';
import { reactive, ref } from 'vue';
import { JpFormOptions } from '@/components/JpForm/type.ts';
import { $t } from '@/plugins/i18n/i18nUtils';
import HighlightCode from './HighlightCode.vue';
import { VBtn, VIcon } from 'vuetify/components';
const tsxCode = `
  // use method
  openModal({
        component: <HighlightCode code={tsxCode} />,
        props: {
          title: 'TSX Modal',
          width: '600',
        },
  });
`;
const opacityCode = `
  // use method
  // 注意：此处只是透明度为0，遮罩并未消失。因此依然不能点击页面的其他元素。
   openModal({
        component: <HighlightCode code={opacityCode} />,
        props: {
          title: '无遮罩 Modal',
          width: '600',
          persistent: true,
          opacity: 0,
        },
    });
`;

const fullscreenCode = `
  // use method
    openModal({
        component: <HighlightCode code={fullscreenCode} />,
        props: {
          title: 'fullscreen Modal',
          fullscreen: true,
          transition: 'slide-x-reverse-transition',
        },
    });
`;
const nestingCode = `
  // use method
    openModal({
        component: (
          <div class="tw-flex-col">
            <div onClick={newModal}>
              <VBtn class="tw-mb-2">点击弹出新的Modal</VBtn>
            </div>
            <HighlightCode code={fullscreenCode} />
          </div>
        ),
        props: {
          title: '嵌套 Modal',
          width: '600',
        },
      });
`;

const titleCode = `
  // use method
    openModal({
        component: <HighlightCode code={titleCode} />,
        props: {
          title: '自定义头部 Modal',
          width: '500',
        },
        slots: {
          titleSlot: (
            <div class="tw-flex tw-justify-between">
              <div>自定义头部</div>
              <div
                onClick={() => {
                  alert('正在连接扫描端，请等待......');
                }}
              >
                <VIcon
                  icon="mdi-barcode-scan"
                  class="tw-cursor-pointer"
                ></VIcon>
              </div>
            </div>
          ),
        },
      });
`;

const footCode = `
  // use method
   openModal({
        component: <HighlightCode code={footCode} />,
        props: {
          title: '自定义底部 Modal',
          width: '700',
        },
        slots: {
          footSlot: (
            <div class="tw-flex tw-justify-between tw-w-full">
              <div>自定义底部</div>
              <div
                onClick={() => {
                  alert('正在连接扫描端，请等待......');
                }}
              >
                <VIcon
                  icon="mdi-barcode-scan"
                  class="tw-cursor-pointer"
                ></VIcon>
              </div>
            </div>
          ),
        },
      });
`;

const persistentCode = `
  // use method
  openModal({
        component: <HighlightCode code={persistentCode} />,
        props: {
          title: '组织关闭Esc/点击外部区域关闭 Modal',
          width: '700',
          persistent: true,
        },
    });
`;

const callbackCode = `
  // use method
  openModal({
        component: <HighlightCode code={callbackCode} />,
        props: {
          title: '默认Cancel/Confim回调 Modal',
          width: '600',
        },
        callbackMethod: {
          // true关闭 false阻止弹出框关闭
          onCloseCallback: () => {
            return true;
          },
          onConfirmCallback: () => {
            return false;
          },
        },
    });
`;

const formRef = ref(null);
const newModal = () => {
  openModal({
    component: <div>*****</div>,
    props: {
      title: '新的Modal',
      width: '400',
    },
  });
};
const useOpenModal = (action: number) => {
  switch (action) {
    case 1:
      openModal({
        component: <HighlightCode code={tsxCode} />,
        props: {
          title: 'TSX Modal',
          width: '700',
        },
      });
      break;
    case 2:
      openModal({
        component: MyComponent,
        props: {
          title: 'VNode Modal',
          width: '700',
        },
      });
      break;
    case 3:
      openModal({
        component: (
          <JpForm
            ref={formRef.value}
            form-options={formOptions}
            class="tw-pb-0"
          ></JpForm>
        ),
        props: {
          title: 'Form Modal',
          width: '800',
        },
      });
      break;
    case 4:
      openModal({
        component: <HighlightCode code={opacityCode} />,
        props: {
          title: '无遮罩 Modal',
          width: '700',
          opacity: 0,
        },
      });

      break;
    case 5:
      openModal({
        component: <HighlightCode code={fullscreenCode} />,
        props: {
          title: 'fullscreen Modal',
          fullscreen: true,
          transition: 'slide-x-reverse-transition',
        },
      });
      break;
    case 6:
      openModal({
        component: (
          <div class="tw-flex-col">
            <div onClick={newModal}>
              <VBtn class="tw-mb-2">点击弹出新的Modal</VBtn>
            </div>
            <HighlightCode code={nestingCode} />
          </div>
        ),
        props: {
          title: '嵌套 Modal',
          width: '600',
        },
        callbackMethod: {
          onCloseCallback: () => {
            return true;
          },
          onConfirmCallback: () => {
            return false;
          },
        },
      });
      break;
    case 7:
      openModal({
        component: <HighlightCode code={titleCode} />,
        props: {
          title: '自定义头部 Modal',
          width: '700',
        },
        slots: {
          titleSlot: (
            <div class="tw-flex tw-justify-between">
              <div>自定义头部</div>
              <div
                onClick={() => {
                  alert('正在连接扫描端，请等待......');
                }}
              >
                <VIcon
                  icon="mdi-barcode-scan"
                  class="tw-cursor-pointer"
                ></VIcon>
              </div>
            </div>
          ),
        },
      });
      break;
    case 8:
      openModal({
        component: <HighlightCode code={footCode} />,
        props: {
          title: '自定义底部 Modal',
          width: '700',
        },
        slots: {
          footSlot: (
            <div class="tw-flex tw-justify-between tw-w-full">
              <div>自定义底部</div>
              <div
                onClick={() => {
                  alert('正在连接扫描端，请等待......');
                }}
              >
                <VIcon
                  icon="mdi-barcode-scan"
                  class="tw-cursor-pointer"
                ></VIcon>
              </div>
            </div>
          ),
        },
      });
      break;
    case 9:
      openModal({
        component: <HighlightCode code={persistentCode} />,
        props: {
          title: '组织关闭Esc/点击外部区域关闭 Modal',
          width: '700',
          persistent: true,
        },
      });
      break;
    case 10:
      openModal({
        component: <HighlightCode code={callbackCode} />,
        props: {
          title: '默认Cancel/Confim回调 Modal',
          width: '600',
        },
        callbackMethod: {
          onCloseCallback: () => {
            return true;
          },
          onConfirmCallback: () => {
            alert('没通过校验，请确认');
            return false;
          },
        },
      });
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
