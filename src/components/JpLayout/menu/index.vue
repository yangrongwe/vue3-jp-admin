<template>
  <v-list
    v-model:selected="selectedMenu"
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
        :value="menuItem.path"
        color="primary"
        @click="toPage(1, menuItem)"
      ></v-list-item>

      <template v-else>
        <v-list-group
          v-if="menuItem.children && menuItem.children.length != 0"
          :value="menuItem.path"
        >
          <template v-slot:activator="{ props }">
            <v-list-item
              v-if="!menuItem.meta.unShow"
              v-bind="props"
              :prepend-icon="menuItem.meta.icon"
              :title="menuItem.meta.title"
              @click.stop="rail = false"
            ></v-list-item>
          </template>
          <template v-for="(subMenuItem, i) in menuItem.children" :key="i">
            <v-list-item
              v-if="!subMenuItem.meta.unShow"
              class="sub-menu-pl"
              :prepend-icon="subMenuItem.meta.icon"
              :title="subMenuItem.meta.title"
              :value="menuItem.path + '/' + subMenuItem.path"
              @click="toPage(2, menuItem, subMenuItem)"
            ></v-list-item
          ></template>
        </v-list-group>
      </template>
    </template>
  </v-list>
</template>

<script setup lang="tsx">
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import { useTabsStore } from '@/store/tabs';
import { RouteRecordRaw } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();
const tabsStore = useTabsStore();
const expandedMenuItem = ref<string[]>(['/user']);
const selectedMenu = ref<string[]>(['/dashboard']);
watchEffect(() => {
  const newTab = tabsStore.selectedTab;
  selectedMenu.value[0] = newTab;
});
const rail = ref<boolean>(false);
const menuItems: RouteRecordRaw[] = authStore.filteredMenuRoutes;

const toPage = (
  level: number,
  menuInfo: RouteRecordRaw,
  subMenuInfo?: RouteRecordRaw
) => {
  if (level === 1) {
    router.push(menuInfo.path);
    tabsStore.setTabs(menuInfo.meta.title as string, menuInfo.path);
  } else {
    const path = menuInfo.path + '/' + subMenuInfo.path;
    router.push(path);
    tabsStore.setTabs(subMenuInfo.meta.title as string, path);
  }
};
</script>
<style lang="scss" scoped>
.sub-menu-pl {
  padding-left: 46px !important;
}
</style>
