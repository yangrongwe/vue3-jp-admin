<template>
  <div
    v-for="(alert, index) in alerts"
    :key="alert.id"
    class="tw-flex tw-justify-center tw-content-center"
  >
    <v-alert
      v-bind="alert.props"
      :class="alertClasses"
      :style="getTopStyle(index)"
      @click="removeAlert(alert.id)"
    >
      {{ alert.message }}
    </v-alert>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { VAlert } from 'vuetify/components';
import { useDisplay } from 'vuetify';
import { useAlertStore } from '@/store/alertStore';

export default defineComponent({
  name: 'AlertComponent',
  components: {
    VAlert,
  },
  setup() {
    const alertStore = useAlertStore();
    const alerts = computed(() => alertStore.alerts);
    const { mobile } = useDisplay();

    const alertClasses = computed(() =>
      mobile.value
        ? ['tw-fixed', 'tw-z-[9999]', 'tw-inset-x-[15px]', 'tw-w-auto']
        : ['tw-fixed', 'tw-z-[9999]']
    );

    const getTopStyle = (index: number) => {
      const topPosition = 150 + index * 80;
      return { top: `${topPosition}px` };
    };

    const removeAlert = (id: number) => {
      alertStore.removeAlert(id);
    };

    return {
      alertClasses,
      alerts,
      getTopStyle,
      removeAlert,
    };
  },
});
</script>

<style scoped lang="scss"></style>
