<template>
  <v-app>
    <jp-left-bar></jp-left-bar>
    <jp-header-bar></jp-header-bar>

    <jp-main></jp-main>
    <jp-footer-bar></jp-footer-bar>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import JpLeftBar from './JpLeftBar.vue';
import JpHeaderBar from './JpHeaderBar.vue';
import JpFooterBar from './JpFooterBar.vue';
import JpMain from './JpMain.vue';
const drawer = ref(true);
const router = useRouter();

const toggleExpand = (item) => {
  item.expanded = !item.expanded;
};

const navigate = (route) => {
  router.push(route);
  drawer.value = false;
};
</script>

<style scoped></style>
