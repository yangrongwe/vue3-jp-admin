import { useModalStore } from '@/store/modalStore';
import { markRaw, render, h } from 'vue';
import CustomModal from '@/components/JpModal/index.vue';
import { app } from '../main.js';
export function getAppContext() {
  return app._context; // _context 是 Vue 应用实例的上下文
}
export function openModal({
  component = null,
  props = {},
  slots = {},
  callbackMethod = {},
}: {
  component: any;
  props?: Record<string, any>;
  slots?: Record<string, any>;
  callbackMethod?: Record<string, any>;
}) {
  const modalStore = useModalStore();
  const componentRef = markRaw(component);
  const id = modalStore.openModal(
    componentRef,
    { ...props },
    slots,
    callbackMethod
  );

  const modalElement = document.createElement('div');
  document.body.appendChild(modalElement);

  const modalInstance = h(CustomModal, { modalId: id });

  // 第三方UI vuetify报错 识别不到
  modalInstance.appContext = getAppContext();

  render(modalInstance, modalElement);

  return id;
}

export function closeModal(id: string) {
  const modalStore = useModalStore();
  modalStore.closeModal(id);
}

export function closeAllModals() {
  const modalStore = useModalStore();
  modalStore.closeAllModals();
}
