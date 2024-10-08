<template>
  <jp-main-area :h-full="true">
    <template v-slot:title>
      <div>
        Vxe-Table:
        <a
          class="tw-underline tw-cursor-pointer tw-ml-2 tw-underline-offset-4"
          target="_blank"
          style="color: #409eff"
          href="https://vxetable.cn/#/component/grid/export/xml"
          >{{ $t('views.table.documentationLink') }}</a
        >
      </div>
    </template>

    <!-- タブ ナビゲーション -->
    <v-tabs v-model="activeTab">
      <v-tab :value="0">{{ $t('views.table.tabs.basicTable') }}</v-tab>
      <v-tab :value="1">{{ $t('views.table.tabs.paginationTable') }}</v-tab>
      <v-tab :value="2">{{ $t('views.table.tabs.treeTable') }}</v-tab>
      <v-tab :value="3">{{ $t('views.table.tabs.editableTable') }}</v-tab>
      <v-tab :value="4">{{ $t('views.table.tabs.customColumnTable') }}</v-tab>
      <v-tab :value="5">{{ $t('views.table.tabs.mergeCellTable') }}</v-tab>
      <v-tab :value="6">{{ $t('views.table.tabs.rightClickMenuTable') }}</v-tab>
      <v-tab :value="7">{{ $t('views.table.tabs.dataExport') }}</v-tab>
    </v-tabs>

    <v-tabs-window v-model="activeTab" class="tw-py-2">
      <!-- 基本表格 -->
      <v-tabs-window-item value="0">
        <vxe-grid v-bind="basicGridOptions"></vxe-grid>
      </v-tabs-window-item>

      <!-- ページネーション表格 -->
      <v-tabs-window-item value="1">
        <vxe-grid v-bind="paginationGridOptions" v-on="gridEvents"></vxe-grid>
      </v-tabs-window-item>

      <!-- ツリーテーブル -->
      <v-tabs-window-item value="2">
        <vxe-grid v-bind="treeGridOptions"></vxe-grid>
      </v-tabs-window-item>

      <!-- 編集可能な表格 -->
      <v-tabs-window-item value="3">
        <vxe-grid v-bind="editableGridOptions"></vxe-grid>
      </v-tabs-window-item>

      <!-- カスタムカラム表格 -->
      <v-tabs-window-item value="4">
        <vxe-grid v-bind="customColumnGridOptions"></vxe-grid>
      </v-tabs-window-item>

      <!-- セル結合表格 -->
      <v-tabs-window-item value="5">
        <vxe-grid v-bind="mergeCellGridOptions"></vxe-grid>
      </v-tabs-window-item>

      <!-- 右クリックメニュー表格 -->
      <v-tabs-window-item value="6">
        <vxe-grid
          v-bind="rightClickGridOptions"
          ref="rightClickGridRef"
          v-on="gridEvents"
        ></vxe-grid>
      </v-tabs-window-item>

      <!-- データエクスポート -->
      <v-tabs-window-item value="7">
        <div class="tw-flex tw-gap-2 tw-my-2 tw-flex-row-reverse">
          <v-btn @click="exportEvent('txt')" size="small">{{
            $t('views.table.export.txt')
          }}</v-btn>
          <v-btn @click="exportEvent('xml')" size="small">{{
            $t('views.table.export.xml')
          }}</v-btn>
          <v-btn @click="exportEvent('html')" size="small">{{
            $t('views.table.export.html')
          }}</v-btn>
          <v-btn @click="exportEvent('csv')" size="small">{{
            $t('views.table.export.csv')
          }}</v-btn>
        </div>
        <vxe-grid v-bind="exportGridOptions" ref="exportGridRef"></vxe-grid>
      </v-tabs-window-item>
    </v-tabs-window>
  </jp-main-area>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import JpMainArea from '@/components/JpLayout/layout/JpMainArea.vue';
import {
  basicGridOptions,
  paginationGridOptions,
  treeGridOptions,
  editableGridOptions,
  customColumnGridOptions,
  mergeCellGridOptions,
  rightClickGridOptions,
  gridEvents,
  rightClickGridRef,
  exportGridRef,
  exportGridOptions,
  exportEvent,
} from './hook.tsx';

// 現在アクティブなタブ
const activeTab = ref(0);
</script>
