<template>
  <v-app-bar color="app-bar-primary">
    <template v-slot:prepend>
      <div v-if="mobile">
        <v-menu width="200">
          <template v-slot:activator="{ props }">
            <v-btn icon="mdi mdi-format-list-bulleted" v-bind="props"> </v-btn>
          </template>

          <menu-list></menu-list>
        </v-menu>
      </div>
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
import { useDisplay } from 'vuetify';
import MenuList from '../menu/index.vue';

const { mobile } = useDisplay();
</script>
