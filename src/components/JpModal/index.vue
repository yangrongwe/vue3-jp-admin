<template>
  <v-dialog
    v-model="isVisible"
    :style="{ zIndex: modal?.zIndex }"
    v-bind="modal?.props"
  >
    <v-card v-if="modal">
      <v-card-title>{{ modal.props?.title }}</v-card-title>
      <v-card-text>
        <component :is="modal.component" v-bind="modal.props" />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
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
</script>

<style scoped lang="scss">
.v-dialog {
  transition: none;
}
</style>
