// store/modalStore.ts
import { defineStore } from 'pinia';

interface Modal {
  id: string;
  component: any;
  props?: Record<string, any>;
  slots?: Record<string, any>;
  zIndex: number;
  callbackMethod?: Record<string, Function>;
}

export const useModalStore = defineStore('modalStore', {
  state: () => ({
    modals: [] as Modal[],
    zIndexCounter: 2000,
  }),
  actions: {
    openModal(
      component: any,
      props?: Record<string, any>,
      slots?: Record<string, any>,
      callbackMethod?: Record<string, Function>
    ) {
      const id = `modal-${Date.now()}`;
      this.zIndexCounter++;
      this.modals.push({
        id,
        component,
        props,
        zIndex: this.zIndexCounter,
        slots,
        callbackMethod,
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
