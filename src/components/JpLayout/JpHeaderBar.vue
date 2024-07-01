<template>
  <v-app-bar color="app-bar-primary">
    <template v-slot:prepend>
      <v-app-bar-nav-icon v-if="mobile"></v-app-bar-nav-icon>
    </template>

    <!-- <v-app-bar-title> -->
    <!-- <v-breadcrumbs :items="items">
    <template v-slot:title="{ item }">
      {{ item.title.toUpperCase() }}
    </template>
  </v-breadcrumbs> -->
    <!-- </v-app-bar-title> -->
    <div>123003-とんかつ一番（いちぱん）</div>

    <template v-slot:append>
      <v-btn icon="mdi-heart"></v-btn>

      <v-btn icon="mdi-magnify"></v-btn>

      <v-btn icon="mdi-dots-vertical"></v-btn>
    </template>
  </v-app-bar>
</template>
<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import { useDisplay } from 'vuetify';
const { mobile,name } = useDisplay();

onMounted(() => {
  console.log(mobile.value,name.value); // false
});

</script>
