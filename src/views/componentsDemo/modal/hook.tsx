import { openModal } from '@/utils/modalUtils';
import MyComponent from './MyComponent.vue';
import JpForm from '@/components/JpForm/index.vue';
import { reactive, ref } from 'vue';
import { JpFormOptions } from '@/components/JpForm/type.ts';
import { $t } from '@/plugins/i18n/i18nUtils';
import HighlightCode from './HighlightCode.vue';
import { VBtn, VIcon } from 'vuetify/components';
import { MainTitle } from '@/types/index';

const mainTitle: MainTitle = {
  title: $t('views.modal.mainTitle'),
  linkText: 'src/views/componentsDemo/modal/index.vue',
  path: 'https://github.com/yangrongwe/vue3-jp-admin/blob/main/src/views/componentsDemo/modal/index.vue',
};
// TSX Modal の使用方法
const tsxCode = `
  // use method
  openModal({
        component: <HighlightCode code={tsxCode} />,
        props: {
          title: $t('views.modal.tsxModal.title'),
          width: '600',
        },
  });
`;

// 透明度0の Modal 使用方法
const opacityCode = `
  // use method
  // 注意：${$t('views.modal.opacityModal.note')}
   openModal({
        component: <HighlightCode code={opacityCode} />,
        props: {
          title: $t('views.modal.opacityModal.title'),
          width: '600',
          persistent: true,
          opacity: 0,
        },
    });
`;

// フルスクリーン Modal の使用方法
const fullscreenCode = `
  // use method
    openModal({
        component: <HighlightCode code={fullscreenCode} />,
        props: {
          title: $t('views.modal.fullscreenModal.title'),
          fullscreen: true,
          transition: 'slide-x-reverse-transition',
        },
    });
`;

// ネストされた Modal の使用方法
const nestingCode = `
  // use method
    openModal({
        component: (
          <div class="tw-flex-col">
            <div onClick={newModal}>
              <VBtn class="tw-mb-2">${$t('views.modal.nestingModal.buttonText')}</VBtn>
            </div>
            <HighlightCode code={fullscreenCode} />
          </div>
        ),
        props: {
          title: $t('views.modal.nestingModal.title'),
          width: '600',
        },
      });
`;

// カスタムヘッダー Modal の使用方法
const titleCode = `
  // use method
    openModal({
        component: <HighlightCode code={titleCode} />,
        props: {
          title: $t('views.modal.titleModal.title'),
          width: '500',
        },
        slots: {
          titleSlot: (
            <div class="tw-flex tw-justify-between">
              <div>${$t('views.modal.titleModal.customHeader')}</div>
              <div
                onClick={() => {
                  alert($t('views.modal.titleModal.alertMessage'));
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

// カスタムフッター Modal の使用方法
const footCode = `
  // use method
   openModal({
        component: <HighlightCode code={footCode} />,
        props: {
          title: $t('views.modal.footModal.title'),
          width: '700',
        },
        slots: {
          footSlot: (
            <div class="tw-flex tw-justify-between tw-w-full">
              <div>${$t('views.modal.footModal.customFooter')}</div>
              <div
                onClick={() => {
                  alert($t('views.modal.footModal.alertMessage'));
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

// 組織閉じる Esc/外部領域をクリックして閉じる Modal の使用方法
const persistentCode = `
  // use method
  openModal({
        component: <HighlightCode code={persistentCode} />,
        props: {
          title: $t('views.modal.persistentModal.title'),
          width: '700',
          persistent: true,
        },
    });
`;

// デフォルト Cancel/Confirm コールバック Modal の使用方法
const callbackCode = `
  // use method
  openModal({
        component: <HighlightCode code={callbackCode} />,
        props: {
          title: $t('views.modal.callbackModal.title'),
          width: '600',
        },
        callbackMethod: {
          // trueは閉じる falseはポップアップを閉じない
          onCloseCallback: () => {
            return true;
          },
          onConfirmCallback: () => {
            return false;
          },
        },
    });
`;

const drawerTop = ` openModal({
        component: <HighlightCode code={fullscreenCode} />,
        props: {
          title: $t('views.modal.fullscreenModal.title'),
          fullscreen: true,
          height: 400,
          transition: 'slide-x-reverse-transition',
          class: 'drawer-top',
        },
      });`;
const drawerRight = `openModal({
        component: <HighlightCode code={fullscreenCode} />,
        props: {
          title: $t('views.modal.fullscreenModal.title'),
          fullscreen: true,
          width: 600,
          transition: 'slide-x-reverse-transition',
          class: 'drawer-right',
        },
      });`;
const drawerBottom = `openModal({
        component: <HighlightCode code={fullscreenCode} />,
        props: {
          title: $t('views.modal.fullscreenModal.title'),
          fullscreen: true,
          height: 400,
          transition: 'slide-x-reverse-transition',
          class: 'drawer-bottom',
        },
      });`;
const drawerLeft = ` openModal({
        component: <HighlightCode code={fullscreenCode} />,
        props: {
          title: $t('views.modal.fullscreenModal.title'),
          fullscreen: true,
          width: 600,
          transition: 'slide-x-reverse-transition',
          class: 'drawer-left',
        },
      });`;
const formRef = ref(null);
const newModal = () => {
  openModal({
    component: <div>*****</div>,
    props: {
      title: $t('views.modal.newModal.title'),
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
          title: $t('views.modal.tsxModal.title'),
          width: '700',
        },
      });
      break;
    case 2:
      openModal({
        component: MyComponent,
        props: {
          title: $t('views.modal.vnodeModal.title'),
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
          title: $t('views.modal.formModal.title'),
          width: '800',
        },
      });
      break;
    case 4:
      openModal({
        component: <HighlightCode code={opacityCode} />,
        props: {
          title: $t('views.modal.opacityModal.title'),
          width: '700',
          opacity: 0,
        },
      });

      break;
    case 5:
      openModal({
        component: <HighlightCode code={fullscreenCode} />,
        props: {
          title: $t('views.modal.fullscreenModal.title'),
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
              <VBtn class="tw-mb-2">
                {$t('views.modal.nestingModal.buttonText')}
              </VBtn>
            </div>
            <HighlightCode code={nestingCode} />
          </div>
        ),
        props: {
          title: $t('views.modal.nestingModal.title'),
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
          title: $t('views.modal.titleModal.title'),
          width: '700',
        },
        slots: {
          titleSlot: (
            <div class="tw-flex tw-justify-between">
              <div>{$t('views.modal.titleModal.customHeader')}</div>
              <div
                onClick={() => {
                  alert($t('views.modal.titleModal.alertMessage'));
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
          title: $t('views.modal.footModal.title'),
          width: '700',
        },
        slots: {
          footSlot: (
            <div class="tw-flex tw-justify-between tw-w-full">
              <div>{$t('views.modal.footModal.customFooter')}</div>
              <div
                onClick={() => {
                  alert($t('views.modal.footModal.alertMessage'));
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
          title: $t('views.modal.persistentModal.title'),
          width: '700',
          persistent: true,
        },
      });
      break;
    case 10:
      openModal({
        component: <HighlightCode code={callbackCode} />,
        props: {
          title: $t('views.modal.callbackModal.title'),
          width: '600',
        },
        callbackMethod: {
          onCloseCallback: () => {
            return true;
          },
          onConfirmCallback: () => {
            alert($t('views.modal.callbackModal.confirmAlert'));
            return false;
          },
        },
      });
      break;
    case 11:
      openModal({
        component: <HighlightCode code={drawerTop} />,
        props: {
          title: $t('views.modal.drawerModal.top'),
          fullscreen: true,
          height: 400,
          transition: 'slide-x-reverse-transition',
          drawerClass: 'drawer-top',
        },
      });
      break;
    case 12:
      openModal({
        component: <HighlightCode code={drawerRight} />,
        props: {
          title: $t('views.modal.drawerModal.right'),
          fullscreen: true,
          width: 600,
          transition: 'slide-x-reverse-transition',
          drawerClass: 'drawer-right',
        },
      });
      break;
    case 13:
      openModal({
        component: <HighlightCode code={drawerBottom} />,
        props: {
          title: $t('views.modal.drawerModal.bottom'),
          fullscreen: true,
          height: 400,
          transition: 'slide-x-reverse-transition',
          drawerClass: 'drawer-bottom',
        },
      });
      break;
    case 14:
      openModal({
        component: <HighlightCode code={drawerLeft} />,
        props: {
          title: $t('views.modal.drawerModal.left'),
          fullscreen: true,
          width: 600,
          transition: 'slide-x-reverse-transition',
          drawerClass: 'drawer-left',
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

export { useOpenModal, mainTitle };
