<template>
    <v-dialog
      v-model:show="isVisible"
      v-bind="dialogProps"
      :z-index="zIndex"
      @click:outside="handleClose"
    >
      <v-card>
        <v-card-title>
          <slot name="title">Default Title</slot>
        </v-card-title>
        <v-card-subtitle>
          <slot name="content">Default Content</slot>
        </v-card-subtitle>
        <v-card-actions>
          <slot name="footer">
            <v-btn @click="handleClose">Close</v-btn>
            <v-btn @click="handleCancel">Cancel</v-btn>
          </slot>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { useModalStore } from '@/store/modal';
  
  export default defineComponent({
    props: {
      id: {
        type: Number,
        required: true,
      },
      dialogProps: {
        type: Object,
        default: () => ({}),
      },
    },
    setup(props) {
      const modalStore = useModalStore();
      const isVisible = computed(() => modalStore.modals[props.id]?.visible ?? false);
      const zIndex = computed(() => modalStore.modals[props.id]?.zIndex ?? 1000);
  
      const handleClose = () => {
        modalStore.closeModal(props.id);
      };
  
      const handleCancel = () => {
        modalStore.closeModal(props.id);
      };
  
      return {
        isVisible,
        zIndex,
        handleClose,
        handleCancel,
      };
    },
  });
  </script>
  