<template>
  <v-main class="tw-h-full" :style="{ '--v-layout-bottom': '0px' }">
    <div class="tw-px-6 tw-pt-6 tw-pb-24 tw-bg-slate-100 tw-h-full">
      <v-tabs
        v-model="tab"
        show-arrows
        align-tabs="left"
        color="tab-color"
        slider-color="tab-slider-color"
        class="tw-mb-3 custom-tabs"
      >
        <template v-for="(item, index) in tabs" :key="index">
          <v-tab :value="item.value" class="tw-mr-2 tw-bg-gray-200 custom-tabs">
            <div class="tw-h-full tw-flex tw-justify-center tw-content-center">
              <div class="tw-mr-2">{{ item.title }}</div>
              <v-icon icon="mdi mdi-close"></v-icon>
            </div>
          </v-tab>
        </template>
      </v-tabs>

      <router-view></router-view>
    </div>
  </v-main>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useTabsStore } from '@/store/tabs';
const tabsStore = useTabsStore();
const tab = computed({
  get: () => tabsStore.selectedTab,
  set: (value) => tabsStore.setSelectedTab(value),
});
const tabs = computed(() => tabsStore.getTabs);
</script>
<style lang="scss">
.custom-tabs {
  height: 35px !important;
}
</style>
