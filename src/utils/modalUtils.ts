import { useModalStore } from '@/store/modal';

const modalStore = useModalStore();

export function openModal(id: number, dialogProps: Record<string, any> = {}) {
  console.log('Opening modal', id, dialogProps);
  modalStore.openModal(id, dialogProps);
}

export function closeModal(id: number) {
  console.log('Closing modal', id);
  modalStore.closeModal(id);
}

export function closeAllModals() {
  console.log('Closing all modals');
  modalStore.closeAllModals();
}
