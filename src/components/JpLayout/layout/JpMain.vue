<template>
  <!-- メインコンテンツ領域 -->
  <v-main class="tw-h-full" :style="{ '--v-layout-bottom': '0px' }">
    <!-- コンテンツコンテナ -->
    <div class="tw-px-6 tw-pt-6 tw-pb-24 tw-bg-slate-100 tw-h-full">
      <!-- Vuetify の Tabs コンポーネント -->
      <v-tabs
        v-model="tab"
        show-arrows
        align-tabs="left"
        color="tab-color"
        slider-color="tab-slider-color"
        class="tw-mb-3 custom-tabs"
      >
        <!-- すべてのタブを反復処理してレンダリング -->
        <template v-for="(item, index) in tabs" :key="index">
          <!-- 個々のタブ -->
          <v-tab
            :value="item.value"
            class="tw-mr-2 tw-bg-gray-200 custom-tabs"
            @click="navigateTo(item.value)"
          >
            <!-- タブのコンテンツ -->
            <div class="tw-h-full tw-flex tw-justify-center tw-content-center">
              <div class="tw-mr-2">{{ item.title }}</div>
              <v-icon
                icon="mdi mdi-close"
                @click.stop="removeTab(item.value)"
              ></v-icon>
            </div>
          </v-tab>
        </template>
      </v-tabs>

      <!-- Vue Router のビュー コンテナ -->
      <router-view></router-view>
    </div>
  </v-main>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useTabsStore } from '@/store/tabs';

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
</script>

<style lang="scss">
.custom-tabs {
  height: 35px !important;
}
</style>
