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
          v-if="!menuItem.children && !menuItem.meta.unShow"
          :prepend-icon="menuItem.meta.icon"
          :title="menuItem.name"
          :value="menuItem.name"
          color="primary"
          @click="router.push(menuItem.path)"
        ></v-list-item>

        <template v-else>
          <v-list-group
            :value="menuItem.name"
            v-if="menuItem.children && menuItem.children.length != 0"
          >
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                :prepend-icon="menuItem.meta.icon"
                :title="menuItem.name"
                v-if="!menuItem.meta.unShow"
                @click.stop="rail = false"
              ></v-list-item>
            </template>
            <template v-for="(subMenuItem, i) in menuItem.children" :key="i">
              <v-list-item
                v-if="!subMenuItem.meta.unShow"
                class="sub-menu-pl"
                :prepend-icon="subMenuItem.meta.icon"
                :title="subMenuItem.name"
                :value="subMenuItem.name"
                @click="router.push(menuItem.path + '/' + subMenuItem.path)"
              ></v-list-item
            ></template>
          </v-list-group>
        </template>
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
import { ref } from 'vue';
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
const menuItems = authStore.filteredMenuRoutes;
console.log('menuItems', menuItems);
</script>
<style lang="scss" scoped>
.sub-menu-pl {
  padding-left: 46px !important;
}
</style>
