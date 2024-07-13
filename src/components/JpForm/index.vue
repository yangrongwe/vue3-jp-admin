<template>
  <v-form v-bind="$attrs" class="tw-px-12 tw-pt-1 tw-py-12">
    <template v-for="item in formOptions.formItems">
      <div v-if="item.itemType == 'image'">
        <v-img
          :width="item.width"
          :src="item.imagePath"
          class="tw-mx-auto"
        ></v-img>
      </div>
      <div
        v-if="item.itemType == 'text'"
        :class="item.labelPosition == 'top' ? '' : 'tw-flex'"
      >
        <div v-if="item.itemName != ''" class="tw-mr-2 tw-w-20">
          {{ item.itemName }}
        </div>
        <JpInput
          density="compact"
          placeholder="Email address"
          :prepend-inner-icon="
            item.prependInnerIcon ? item.prependInnerIcon : ''
          "
          variant="outlined"
        ></JpInput>
      </div>
      <div
        v-if="item.itemType == 'password'"
        :class="item.labelPosition == 'top' ? '' : 'tw-flex'"
      >
        <div v-if="item.itemName != ''" class="tw-mr-2 tw-w-20">
          <span>{{ item.itemName }}</span>
        </div>

        <JpInput
          :append-inner-icon="item.visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="item.visible ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="item.visible = !item.visible"
        ></JpInput>
      </div>
      <div
        v-if="item.itemType == 'cardText'"
        :class="item.labelPosition == 'top' ? '' : 'tw-flex'"
      >
        <div class="tw-mr-5 tw-w-20" v-if="item.itemName != ''">
          <span>{{ item.itemName }}</span>
        </div>
        <v-card
          class="tw-mb-2 tw-w-full"
          color="surface-variant"
          variant="tonal"
        >
          <v-card-text class="text-medium-emphasis text-caption">
            Warning: After 3 consecutive failed login attempts, you account will
            be temporarily locked for three hours. If you must login now, you
            can also click "Forgot login password?" below to reset the login
            password.
          </v-card-text>
        </v-card>
      </div>
      <div v-if="item.itemType == 'button'">
        <v-btn
          color="blue"
          size="large"
          variant="tonal"
          block
          @click="item.clickMethod"
          >{{ item.itemName }}
        </v-btn>
      </div>
    </template>
  </v-form>
</template>
<script setup lang="ts">
import type JpFormOptions from './type.ts';
import JpInput from '@/components/JpInput/index.vue';

const props = defineProps({
  formOptions: {
    type: Object as () => JpFormOptions,
    default: {
      type: 'vuetify',
      formItems: [],
      rules: [],
    },
  },
});
</script>
<style></style>
