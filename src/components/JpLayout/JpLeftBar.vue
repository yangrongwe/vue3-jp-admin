<template>
  <v-navigation-drawer
    color="navigation-drawer-background"
    :rail="rail"
    :permanent="!mobile"
  >
    <v-list>
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
        subtitle="sandra_a88@gmailcom"
        title="Sandra Adams"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list
      v-model:opened="expandedMenuItem"
      density="compact"
      nav
      color="primary"
    >
      <template v-for="menuItem in menuItems">
        <v-list-item
          :prepend-icon="menuItem.icon"
          :title="menuItem.name"
          :value="menuItem.name"
          color="primary"
          v-if="!menuItem.children"
        ></v-list-item>

        <v-list-group :value="menuItem.name" v-else>
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              :prepend-icon="menuItem.icon"
              :title="menuItem.name"
              @click.stop="rail = false"
            ></v-list-item>
          </template>
          <template v-for="(subMenuItem, i) in menuItem.children" :key="i">
            <v-list-item
              style="padding-left: 45px !important"
              v-if="!subMenuItem.unShow"
              :prepend-icon="subMenuItem.icon"
              :title="subMenuItem.name"
              :value="subMenuItem.name"
            ></v-list-item
          ></template>
        </v-list-group>
      </template>
    </v-list>

    <template v-slot:append>
      <div class="tw-border-t-2 tw-border-l-zinc-300">
        <v-icon
          :icon="!rail ? 'mdi-menu-open' : 'mdi-menu-close'"
          class="tw-mx-3 tw-my-2 tw-text-gray-400"
          @click.stop="rail = !rail"
        ></v-icon>
      </div>
    </template>
  </v-navigation-drawer>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import type { menu } from './type.ts';
import { useDisplay } from 'vuetify';
import { useAuthStore } from '@/store/auth';
const authStore = useAuthStore();
const { mobile, name } = useDisplay();

const rail = ref(false);
// メニューのデフォルト展開項目
const expandedMenuItem = ref<string[]>([]);
const router = useRouter();

// const menuItems = ref<Array<menu>>([
//   {
//     title: 'Dashboard',
//     icon: 'mdi-view-dashboard',
//     route: '/dashboard',
//   },
//   {
//     title: 'Management',
//     icon: 'mdi-folder',
//     expanded: true,
//     children: [
//       { title: 'Users', icon: 'mdi-account', route: '/users' },
//       { title: 'Settings', icon: 'mdi-cog', route: '/settings' },
//     ],
//   },
// ]);
const menuRoutes = JSON.parse(localStorage.getItem('menuRoutes'));
const menuItems = [] as Array<menu>;
menuRoutes.forEach((element) => {
  menuItems.push({
    ...element,
    icon: 'mdi-view-dashboard',
  });
});
console.log('menuRoutes', JSON.parse(localStorage.getItem('menuRoutes')));
</script>
