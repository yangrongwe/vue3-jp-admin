<template>
  <v-app-bar color="app-bar-primary" height="50" extension-height="40">
    <template v-slot:prepend>
      <div v-if="mobile">
        <v-menu width="200">
          <template v-slot:activator="{ props }">
            <v-btn icon="mdi mdi-format-list-bulleted" v-bind="props"> </v-btn>
          </template>

          <menu-list></menu-list>
        </v-menu>
      </div>
      <v-breadcrumbs :items="breadcrumbs" @click="breadcrumbsClick">
        <template v-slot:title="{ item }">
          {{ item.title }}
        </template>
      </v-breadcrumbs>
    </template>

    <template v-slot:default>
      <div v-if="!mobile">Vue3-JP-ADMIN</div>
    </template>

    <template v-slot:append>
      <v-icon icon="mdi-heart" class="tw-mr-4"></v-icon>

      <v-menu>
        <template v-slot:activator="{ props }">
          <v-icon icon="mdi-translate" v-bind="props" class="tw-mr-4"></v-icon>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in localeItems"
            :key="index"
            :value="index"
            @click="
              () => {
                changeLocale(item.value);
              }
            "
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu>
        <template v-slot:activator="{ props }">
          <div
            v-bind="props"
            class="tw-mr-4 tw-flex tw-items-center tw-justify-center tw-gap-2 tw-cursor-pointer"
          >
            <v-avatar color="primary" size="x-small">
              <v-img
                alt="John"
                src="https://cdn.vuetifyjs.com/images/john.jpg"
              ></v-img>
            </v-avatar>
            <div class="tw-text-sm">田中　太郎</div>
          </div>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            :value="index"
            @click="router.push('/login')"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>

    <template v-slot:extension>
      <div class="tw-flex tw-flex-col tw-w-full">
        <v-divider class="tw-w-full"></v-divider>
        <v-tabs
          v-model="tab"
          show-arrows
          align-tabs="start"
          color="tab-color"
          bg-color="tab-bg-color"
          slider-color="tab-slider-color"
          class="custom-tabs"
          selected-class="tab-selected-bg-color"
        >
          <!-- すべてのタブを反復処理してレンダリング -->
          <template v-for="(item, index) in tabs" :key="index">
            <!-- 個々のタブ -->
            <v-tab
              :value="item.value"
              class="custom-tabs"
              @click="navigateTo(item.value)"
            >
              <!-- タブのコンテンツ -->
              <div
                class="tw-h-full tw-flex tw-justify-center tw-content-center"
              >
                <div class="tw-mr-2">{{ item.title }}</div>
                <v-icon
                  icon="mdi mdi-close"
                  @click.stop="removeTab(item.value)"
                ></v-icon>
              </div>
            </v-tab>
          </template>
        </v-tabs>
      </div>
    </template>
  </v-app-bar>
</template>
<script setup lang="ts">
import { useDisplay } from 'vuetify';
import MenuList from '../menu/index.vue';
import { useRouter, useRoute } from 'vue-router';
import { useTabsStore } from '@/store/tabsStore';
import { computed, ref } from 'vue';
import { setLanguageToLocalStorage } from '@/plugins/i18n/i18nUtils';

const tabsStore = useTabsStore(); // カスタムのタブストアを使用
const router = useRouter(); // Vue Router を使用
const route = useRoute(); // 現在のルートを取得

const tab = computed({
  get: () => tabsStore.selectedTab, // 現在選択中のタブを取得
  set: (value) => tabsStore.setSelectedTab(value), // 選択中のタブを設定
});

const tabs = computed(() => tabsStore.getTabs); // すべてのタブのリストを取得

// タブをクリックして画面に移動するメソッド
const navigateTo = (path: string) => {
  tabsStore.setSelectedTab(path); // タブを設定
  router.push(path); // 指定されたルートパスに移動
};

// タブを削除するメソッド
const removeTab = (path: string) => {
  const isCurrentTab = tabsStore.selectedTab === path; // 現在のタブが削除対象かどうかを判断
  tabsStore.removeTab(path); // タブを削除
  if (isCurrentTab && tabsStore.tabs.length > 0) {
    router.push(tabsStore.selectedTab); // 現在のタブが削除され、タブがまだある場合、次のタブに移動
  }
};
// 現在のルートパスに基づいてパンくずリストを生成する
const breadcrumbs = computed(() => {
  const items = route.matched
    .filter((matchedRoute) => matchedRoute.path !== '/')
    .map((matchedRoute) => {
      return {
        title: matchedRoute.meta.title || matchedRoute.name,
        to: { name: matchedRoute.name },
      };
    });
  return items;
});

// breadcrumbsの変更を監視し、選択したラベルを更新
const breadcrumbsClick = () => {
  const currentPath = router.currentRoute.value.path;
  tabsStore.setSelectedTab(currentPath);
};

const { mobile } = useDisplay();

const items = ref([
  {
    title: 'ログアウト',
  },
  {
    title: '設定',
  },
]);

const localeItems = ref([
  {
    title: 'Japan',
    value: 'ja',
  },
  {
    title: 'China',
    value: 'zh',
  },
  {
    title: 'English',
    value: 'en',
  },
]);
// const { locale } = useI18n();
const changeLocale = (lang: string) => {
  // locale.value = lang; // 更新 i18n 实例的语言
  // i18n.
  setLanguageToLocalStorage(lang); // 更新 localStorage 中的语言设置
  window.location.reload();
};
</script>

<style lang="scss" scoped>
.custom-tabs {
  height: 40px !important;
}
.tab-selected-bg-color {
  background-color: rgba(var(--v-theme-tab-selected-bg-color)) !important;
}
</style>
