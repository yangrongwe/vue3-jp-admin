<template>
  <v-dialog
    v-model="isVisible"
    :style="{ zIndex: modal?.zIndex }"
    v-bind="modal?.props"
    :fullscreen="isFullscreen"
  >
    <v-card v-if="modal">
      <v-card-title>
        <template v-if="modal.slots?.titleSlot">
          <component :is="modal.slots.titleSlot" />
        </template>
        <div class="tw-flex tw-justify-between tw-items-center" v-else>
          <div class="tw-flex-shrink-0">{{ modal?.props.title }}</div>
          <div class="tw-flex tw-space-x-2">
            <v-icon @click="toggleFullscreen" v-if="modal?.props.fullscreen">{{
              isFullscreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen'
            }}</v-icon>
            <v-icon @click="closeModal(modal.id)" class="tw-place-items-end">{{
              'mdi-window-close'
            }}</v-icon>
          </div>
        </div>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <component :is="modal.component" v-bind="modal.props" />
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn @click="closeModal(modal.id)">Close</v-btn>
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

// 仅在 modal 有效时触发 isVisible 的变化
watch(modal, (newVal) => {
  if (!newVal && isVisible.value) {
    isVisible.value = false;
  }
});

const closeModal = (id: string) => {
  // 直接设置 isVisible 为 false，以便在过渡结束时移除 DOM 元素
  isVisible.value = false;
  // 延迟执行 modalStore.closeModal 以等待过渡结束
  setTimeout(() => {
    modalStore.closeModal(id);
  }, 300); // 300ms 是 Vue transition 默认过渡时间，可根据需要调整
};

const isFullscreen = ref(modal.value?.props?.fullscreen);
const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value;
};
</script>

<style scoped lang="scss">
.v-dialog {
  transition: none;
}
</style>
