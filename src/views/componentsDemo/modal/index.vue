<!-- App.vue -->
<template>
  <v-btn @click="showModal">Show Modal</v-btn>
  <CustomModal v-if="modalId" :modalId="modalId" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MyComponent from '@/components/JpModal/index.vue';
import { useModalStore } from '@/store/modalStore';

const modalStore = useModalStore();
const modalId = ref<string | null>(null);

const showModal = () => {
  modalId.value = modalStore.openModal(MyComponent, { title: 'My Modal' });
};
</script>
