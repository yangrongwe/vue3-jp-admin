<template>
  <div class="dashboard">
    <div class="tw-flex tw-flex-wrap tw-justify-start">
      <div class="tw-mb-4 tw-max-w-[1000px] tw-min-w-[400px]">
        <v-expansion-panels variant="popout" class="tw-mb-4">
          <v-expansion-panel
            v-for="(message, i) in messages"
            :key="i"
            hide-actions
          >
            <v-expansion-panel-title>
              <v-row align="center" class="spacer" no-gutters>
                <v-col cols="2" md="1" sm="2">
                  <v-avatar size="36px">
                    <v-img
                      v-if="message.avatar"
                      alt="Avatar"
                      src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                    ></v-img>
                    <v-icon
                      v-else
                      :color="message.color"
                      :icon="message.icon"
                    ></v-icon>
                  </v-avatar>
                </v-col>

                <v-col
                  class="hidden-xs-only text-left ms-2"
                  cols="4"
                  md="3"
                  sm="5"
                >
                  <strong v-html="message.name"></strong>
                  <span v-if="message.total" class="text-grey">
                    &nbsp;({{ message.total }})
                  </span>
                </v-col>

                <v-col class="text-no-wrap text-left" cols="5" sm="3">
                  <v-chip
                    v-if="message.new"
                    :color="`${message.color}-lighten-1`"
                    class="ms-0 me-2"
                    label
                    small
                  >
                    {{ message.new }} new
                  </v-chip>
                  <strong v-html="message.title"></strong>
                </v-col>
              </v-row>
            </v-expansion-panel-title>

            <v-expansion-panel-text>
              <v-card-text v-text="lorem"></v-card-text>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>

        <div class="tw-w-full tw-flex tw-flex-wrap tw-justify-between">
          <v-card
            class="tw-basis-1/2 tw-py-10 tw-mb-4 tw-max-w-[480px] tw-min-w-[450px]"
          >
            <JpEcharts :options="chartOptions" />
          </v-card>

          <v-card
            class="tw-px-4 tw-basis-1/2 tw-py-10 tw-mb-4 tw-max-w-[480px] tw-min-w-[450px]"
          >
            <JpEcharts :options="chartRadaOptions" />
          </v-card>
        </div>

        <div class="tw-w-full">
          <v-card class="tw-px-4 tw-mb-4 tw-py-10">
            <JpEcharts :options="option" />
          </v-card>
        </div>

        <!-- <div>
          <vxe-grid v-bind="gridOptions"></vxe-grid>
        </div> -->
      </div>
      <div class="tw-mb-4 tw-mx-4">
        <v-card class="mx-auto mb-4" min-width="400px">
          <v-img
            :aspect-ratio="18 / 7"
            src="	https://cdn.zekkei-japan.jp/images/articles/157bde2830ee9985ed50d6c388273dc9.jpg"
            cover
          >
          </v-img>
          <v-card-title class="tw-flex-col tw-items-end">
            <div class="tw-flex tw-justify-start tw-items-center">
              <v-icon icon="mdi mdi-weather-cloudy-clock" class="mr-2"></v-icon>
              <div class="tw-text-lg tw-align-middle tw-pt-1">
                {{ t('views.dashboard.welcomeCard.temperature') }}
              </div>
            </div>

            <div
              class="tw-text-base tw-text-wrap tw-max-w-[400px] tw-text-zinc-400"
            >
              {{ t('views.dashboard.welcomeCard.text') }}
            </div>
          </v-card-title>

          <v-divider class="mx-4" opacity="0.85"></v-divider>

          <v-card-text class="tw-flex tw-justify-start">
            <v-chip color="pink" label class="tw-mr-4">
              <v-icon icon="mdi-label" start></v-icon>
              Tags
            </v-chip>

            <v-chip color="primary" label class="tw-mr-4">
              <v-icon icon="mdi-account-circle-outline" start></v-icon>
              John
            </v-chip>

            <v-chip color="cyan" label>
              <v-icon icon="mdi-twitter" start></v-icon>
              New
            </v-chip>
          </v-card-text>
        </v-card>

        <v-card class="mx-auto" min-width="400px">
          <v-img
            color="surface-variant"
            height="140"
            src="https://cdn.vuetifyjs.com/docs/images/cards/purple-flowers.jpg"
            cover
          >
            <v-toolbar color="transparent">
              <template v-slot:prepend>
                <v-btn icon="$menu"></v-btn>
              </template>

              <v-toolbar-title
                class="text-h6"
                text="Messages"
              ></v-toolbar-title>

              <template v-slot:append>
                <v-btn icon="mdi-dots-vertical"></v-btn>
              </template>
            </v-toolbar>
          </v-img>

          <v-card-text>
            <div class="font-weight-bold ms-1 mb-2">Today</div>

            <v-timeline align="start" density="compact">
              <v-timeline-item
                v-for="message in messages2"
                :key="message.time"
                :dot-color="message.color"
                size="x-small"
              >
                <div class="mb-4">
                  <div class="font-weight-normal">
                    <strong>{{ message.from }}</strong> @{{ message.time }}
                  </div>

                  <div>{{ message.message }}</div>
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  messages2,
  option,
  labels,
  messages,
  lorem,
  chartOptions,
  chartRadaOptions,
} from './hook.tsx';
import JpEcharts from '@/components/JpEcharts/index.vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<style scoped>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>
