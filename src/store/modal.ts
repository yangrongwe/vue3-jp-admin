// useModalStore.ts
import { defineStore } from 'pinia';

interface ModalState {
  visible: boolean;
  dialogProps: Record<string, any>;
  zIndex: number;
}

export const useModalStore = defineStore('modal', {
  state: () => ({
    modals: {} as Record<number, ModalState>,
    nextZIndex: 1000,
  }),
  actions: {
    openModal(id: number, dialogProps: Record<string, any> = {}) {
      if (this.modals[id]) {
        this.modals[id].visible = true;
        this.modals[id].dialogProps = dialogProps;
        this.modals[id].zIndex = this.nextZIndex++;
      } else {
        this.modals[id] = {
          visible: true,
          dialogProps,
          zIndex: this.nextZIndex++,
        };
      }
    },
    closeModal(id: number) {
      if (this.modals[id]) {
        this.modals[id].visible = false;
      }
    },
    closeAllModals() {
      for (const id in this.modals) {
        this.modals[id].visible = false;
      }
    },
  },
});
