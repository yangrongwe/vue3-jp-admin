// store/modalStore.ts
import { defineStore } from 'pinia';

interface Modal {
  id: string;
  component: any;
  props?: Record<string, any>;
  slots?: Record<string, any>;
  zIndex: number;
}

export const useModalStore = defineStore('modalStore', {
  state: () => ({
    modals: [] as Modal[],
    zIndexCounter: 9999,
  }),
  actions: {
    openModal(
      component: any,
      props?: Record<string, any>,
      slots?: Record<string, any>
    ) {
      const id = `modal-${Date.now()}`;
      this.zIndexCounter++;
      this.modals.push({
        id,
        component,
        props,
        zIndex: this.zIndexCounter,
        slots,
      });
      return id;
    },
    closeModal(id: string) {
      this.modals = this.modals.filter((modal) => modal.id !== id);
    },
    closeAllModals() {
      this.modals = [];
    },
  },
});
