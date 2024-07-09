<template>
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
        :title="menuItem.meta.title"
        :value="menuItem.meta.title"
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
              :title="menuItem.meta.title"
              v-if="!menuItem.meta.unShow"
              @click.stop="rail = false"
            ></v-list-item>
          </template>
          <template v-for="(subMenuItem, i) in menuItem.children" :key="i">
            <v-list-item
              v-if="!subMenuItem.meta.unShow"
              class="sub-menu-pl"
              :prepend-icon="subMenuItem.meta.icon"
              :title="subMenuItem.meta.title"
              :value="subMenuItem.meta.title"
              @click="router.push(menuItem.path + '/' + subMenuItem.path)"
            ></v-list-item
          ></template>
        </v-list-group>
      </template>
    </template>
  </v-list>
</template>

<script setup lang="tsx">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import { RouteRecordRaw } from 'vue-router';
const router = useRouter();
const authStore = useAuthStore();
const expandedMenuItem = ref<string[]>([]);
const rail = ref<boolean>(false);
const menuItems: RouteRecordRaw[] = authStore.filteredMenuRoutes;
</script>
<style lang="scss" scoped>
.sub-menu-pl {
  padding-left: 46px !important;
}
</style>
