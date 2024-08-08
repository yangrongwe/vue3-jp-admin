<!-- components/CustomModal.vue -->
<template>
  <v-dialog
    v-model="isVisible"
    :style="{ zIndex: modal.zIndex }"
    persistent
    max-width="600"
  >
    <template #default="{ close }">
      <v-card>
        <v-card-title>{{ modal.props?.title }}</v-card-title>
        <v-card-text>
          <component :is="modal.component" v-bind="modal.props" />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="closeModal(modal.id)">Close</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useModalStore } from '@/store/modalStore';

const modalStore = useModalStore();
const isVisible = ref(true);

const props = defineProps<{ modalId: string }>();
const modal = computed(() =>
  modalStore.modals.find((m) => m.id === props.modalId)
);

watch(modal, (newVal) => {
  if (!newVal) isVisible.value = false;
});

const closeModal = (id: string) => {
  modalStore.closeModal(id);
  isVisible.value = false;
};
</script>

<style scoped>
.v-dialog {
  transition: none;
}
</style>
