<template>
  <div class="tw-h-full">
    <!-- <v-tabs
      color="primary"
      class="tw-mb-1"
    >
      <v-tab>One</v-tab>
      <v-tab>Two</v-tab>
      <v-tab>Three</v-tab>
      <v-tab>Four</v-tab>
      <v-tab>Five</v-tab>

    </v-tabs> -->
    <v-card class="jp-main-area tw-h-full" variant="flat">
      <!-- <v-card-title style="padding: 0px!important;" class="tw-border-b-4">
        <v-breadcrumbs :items="items" style="padding: 0px!important;">
          <template v-slot:title="{ item }">
            {{ item.title.toUpperCase() }}
          </template>
  </v-breadcrumbs>
      </v-card-title> -->
      <slot></slot>
    </v-card>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
const items = reactive([
  {
    title: 'Dashboard',
    disabled: false,
    href: 'breadcrumbs_dashboard',
  },
  {
    title: 'Link 1',
    disabled: false,
    href: 'breadcrumbs_link_1',
  },
]);
</script>
<style lang="scss">
.jp-main-area {
  padding: 6px 24px !important;
}
</style>
