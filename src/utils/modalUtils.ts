// utils/modal.ts
import { useModalStore } from '@/store/modalStore';
import JpModal from '@/components/JpModal/index.vue';
import { h, render } from 'vue';

const modalStore = useModalStore();

export function openModal(component: any, props?: Record<string, any>) {
  const id = modalStore.openModal(component, props);

  const modalElement = document.createElement('div');
  document.body.appendChild(modalElement);

  const modalInstance = h(JpModal, { modalId: id });
  render(modalInstance, modalElement);

  return id;
}

export function closeModal(id: string) {
  modalStore.closeModal(id);
}

export function closeAllModals() {
  modalStore.closeAllModals();
}
