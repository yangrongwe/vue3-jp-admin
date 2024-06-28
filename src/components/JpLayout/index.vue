<template>
  <v-app>
    <left-bar></left-bar>
    <v-app-bar color="app-bar-primary">
      <v-toolbar-title>My App</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import LeftBar from './leftBar.vue';

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
