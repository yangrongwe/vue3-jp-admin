<template>
  <v-dialog
    v-model="isVisible"
    :style="{ zIndex: modal?.zIndex }"
    v-bind="modal?.props"
    :fullscreen="isFullscreen"
    :class="modal?.props?.drawerClass"
  >
    <v-card v-if="modal">
      <v-card-title>
        <template v-if="modal.slots?.titleSlot">
          <component :is="modal.slots.titleSlot" />
        </template>
        <div class="tw-flex tw-justify-between tw-items-center" v-else>
          <div class="tw-flex-shrink-0">{{ modal?.props.title }}</div>
          <div class="tw-flex tw-space-x-2">
            <v-icon
              @click="toggleFullscreen"
              v-if="modal?.props.fullscreen && !modal?.props?.drawerClass"
              >{{
                isFullscreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen'
              }}</v-icon
            >
            <v-icon @click="closeModal(modal.id)" class="tw-place-items-end">{{
              'mdi-window-close'
            }}</v-icon>
          </div>
        </div>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="tw-overflow-auto tw-max-h-90">
        <component :is="modal.component" v-bind="modal.props" />
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <template v-if="modal.slots?.footSlot">
          <component :is="modal.slots.footSlot" />
        </template>
        <template v-else>
          <v-btn @click="handleCloseClick">{{
            $t('views.modal.cancel')
          }}</v-btn>
          <v-btn @click="handleConfirmClick">{{
            $t('views.modal.confirm')
          }}</v-btn>
        </template>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="tsx">
import { computed, ref, watch } from 'vue';
import { useModalStore } from '@/store/modalStore';

const modalStore = useModalStore();
const isVisible = ref(true);

const props = defineProps<{ modalId: string }>();
const modal = computed(() =>
  modalStore.modals.find((m) => m.id === props.modalId)
);
watch(isVisible, (val) => {
  if (!val) {
    handleCloseClick();
  }
});
const closeModal = (id: string) => {
  // isVisible を false に設定し、トランジション終了時に DOM 要素を削除
  isVisible.value = false;
  // トランジションが終了するまで待機してから modalStore.closeModal を実行
  setTimeout(() => {
    modalStore.closeModal(id);
  }, 300); // 300ms は Vue のトランジションのデフォルト時間で、必要に応じて調整可能
};

const isFullscreen = ref(modal.value?.props?.fullscreen);
const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value;
};

const handleCloseClick = async () => {
  let res = true;
  if (modal.value?.callbackMethod.onCloseCallback) {
    res = await modal.value?.callbackMethod.onCloseCallback();
    if (res) {
      closeModal(modal.value?.id);
    }
  } else {
    closeModal(modal.value?.id);
  }
};

const handleConfirmClick = async () => {
  let res = true;
  if (modal.value?.callbackMethod.onConfirmCallback) {
    res = await modal.value?.callbackMethod.onConfirmCallback();
    if (res) {
      closeModal(modal.value?.id);
    }
  } else {
    closeModal(modal.value?.id);
  }
};
</script>

<style scoped lang="scss">
.v-dialog {
  transition: none;
}

.drawer-top {
  :deep(.v-overlay__content) {
    top: 0 !important;
  }
}
.drawer-left {
  :deep(.v-overlay__content) {
    left: 0 !important;
  }
}
.drawer-bottom {
  :deep(.v-overlay__content) {
    top: auto !important;
    bottom: 0 !important;
  }
}
.drawer-right {
  :deep(.v-overlay__content) {
    left: auto !important;
    right: 0 !important;
  }
}
</style>
