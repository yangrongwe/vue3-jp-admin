<template>
  <v-main class="tw-h-full" :style="{ '--v-layout-bottom': '0px' }">
    <div class="tw-px-6 tw-pt-6 tw-pb-24 tw-bg-slate-100 tw-h-full">
      <v-tabs
        v-model="tab"
        show-arrows
        align-tabs="left"
        color="tab-color"
        slider-color="tab-slider-color"
        style="height: 35px"
        class="tw-mb-3"
      >
        <template v-for="(item, index) in tabs" :key="index">
          <v-tab
            :value="item.value"
            class="tw-mr-2 tw-bg-gray-200"
            style="height: 35px"
          >
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
import { ref, reactive } from 'vue';
const tab = ref<string>(null);
const tabs = reactive([
  {
    value: '1',
    title: 'tab01',
  },
  {
    value: '2',
    title: 'tab02',
  },
  {
    value: '3',
    title: 'tab03',
  },
  {
    value: '4',
    title: 'tab04',
  },
  {
    value: '5',
    title: 'tab05',
  },
]);
</script>
