<script setup lang="ts">
import JpMainArea from '@/components/JpLayout/layout/JpMainArea.vue';
import { handleShowAlert, handleClearAllAlerts, mainTitle } from './hook';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <JpMainArea :h-full="true" :main-title="mainTitle">
    <div>
      <div class="tw-mb-4">{{ t('views.alerts.baseStyle') }}</div>

      <div>
        <v-btn class="tw-mr-4" @click="handleShowAlert(1)">{{
          t('views.alerts.default')
        }}</v-btn>
        <v-btn class="tw-mr-4" @click="handleShowAlert(2)">{{
          t('views.alerts.outlined')
        }}</v-btn>
        <v-btn @click="handleShowAlert(3)">{{ t('views.alerts.tonal') }}</v-btn>
      </div>

      <div class="tw-my-4">{{ t('views.alerts.differentType') }}</div>

      <div>
        <v-btn class="tw-mr-4" @click="handleShowAlert(4)">{{
          t('views.alerts.primary')
        }}</v-btn>
        <v-btn class="tw-mr-4" @click="handleShowAlert(5)">{{
          t('views.alerts.success')
        }}</v-btn>
        <v-btn class="tw-mr-4" @click="handleShowAlert(6)">{{
          t('views.alerts.warning')
        }}</v-btn>
        <v-btn class="tw-mr-4" @click="handleShowAlert(7)">{{
          t('views.alerts.error')
        }}</v-btn>
      </div>

      <div class="tw-my-4">{{ t('views.alerts.timeoutClose') }}</div>

      <div>
        <v-btn class="tw-mr-4" @click="handleShowAlert(8)">{{
          t('views.alerts.autoClose')
        }}</v-btn>
      </div>

      <div class="tw-my-4">{{ t('views.alerts.clearAll') }}</div>

      <div>
        <v-btn class="tw-mr-4" @click="handleClearAllAlerts">{{
          t('views.alerts.close')
        }}</v-btn>
      </div>

      <v-divider class="tw-my-4"></v-divider>

      <div>
        <div class="tw-text-lg tw-mb-04">
          {{ t('views.alerts.demoDescription') }}
        </div>
        <a
          class="tw-text-lg jp-title tw-cursor-pointer tw-underline tw-underline-offset-8"
          target="_blank"
          href="https://vuetifyjs.com/en/api/v-alert/#props"
        >
          {{ t('views.alerts.documentationLink') }}
        </a>
      </div>
    </div>
  </JpMainArea>
</template>
