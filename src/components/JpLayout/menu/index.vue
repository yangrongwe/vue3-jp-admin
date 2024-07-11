<template>
  <v-list
    v-model:selected="selectedMenu"
    v-model:opened="expandedMenuItem"
    density="compact"
    nav
    color="primary"
    open-strategy="multiple"
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
            ></v-list-item>
          </template>
          <template v-for="(subMenuItem, i) in menuItem.children" :key="i">
            <v-list-item
              v-if="!subMenuItem.meta.unShow"
              class="sub-menu-pl"
              :prepend-icon="subMenuItem.meta.icon"
              :title="subMenuItem.meta.title"
              :value="menuItem.path + '/' + subMenuItem.path"
              @click.stop="toPage(2, menuItem, subMenuItem)"
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
const expandedMenuItem = ref<string[]>([]);
const selectedMenu = ref<string[]>(['/dashboard']);
const menuItems: RouteRecordRaw[] = authStore.filteredMenuRoutes;

// tabの変化に伴いメニューも変化する
watchEffect(() => {
  const newTab = tabsStore.selectedTab;
  if (selectedMenu.value[0] == newTab) {
    return;
  }
  selectedMenu.value[0] = newTab;

  // newTabが1階層目のメニューか2階層目のメニューかを判断する
  let isFirstLevel = false;
  let parentPath = '';

  for (const menuItem of menuItems) {
    if (menuItem.path === newTab) {
      isFirstLevel = true;
      break;
    }
    if (menuItem.children) {
      for (const subMenuItem of menuItem.children) {
        if (menuItem.path + '/' + subMenuItem.path === newTab) {
          isFirstLevel = false;
          parentPath = menuItem.path;
          break;
        }
      }
    }
  }
  // 2階層目のメニューの場合、自動的に展開する
  if (!isFirstLevel) {
    if (!expandedMenuItem.value.includes(parentPath)) {
      expandedMenuItem.value.push(parentPath);
    }
  }
});

// 指定された画面に移動する タブが存在しない場合はタブを追加する
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
