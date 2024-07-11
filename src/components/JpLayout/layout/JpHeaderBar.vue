<template>
  <v-app-bar color="app-bar-primary" height="60" extension-height="40">
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

    <template v-slot:default>
      <div>123003-とんかつ一番（いちぱん）</div>
    </template>

    <template v-slot:append>
      <v-btn icon="mdi-heart"></v-btn>

      <v-btn icon="mdi-magnify"></v-btn>

      <v-btn icon="mdi-dots-vertical"></v-btn>
    </template>

    <template v-slot:extension>
      <div class="tw-flex tw-flex-col tw-w-full">
        <v-divider class="tw-w-full" opacity="1"></v-divider>
        <v-tabs
          v-model="tab"
          show-arrows
          align-tabs="left"
          color="tab-color"
          slider-color="tab-slider-color"
          class="custom-tabs"
        >
          <!-- すべてのタブを反復処理してレンダリング -->
          <template v-for="(item, index) in tabs" :key="index">
            <!-- 個々のタブ -->
            <v-tab
              :value="item.value"
              class="custom-tabs tw-border-r-[1px]"
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
import { useRouter } from 'vue-router';
import { useTabsStore } from '@/store/tabs';
import { computed } from 'vue';

const tabsStore = useTabsStore(); // カスタムのタブストアを使用
const router = useRouter(); // Vue Router を使用

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

const { mobile } = useDisplay();
</script>

<style lang="scss">
.custom-tabs {
  height: 40px !important;
}
</style>
