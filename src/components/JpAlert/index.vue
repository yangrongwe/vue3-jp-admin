<template>
  <div>
    <div v-for="(alert, index) in alerts" :key="alert.id">
      <v-alert
        v-bind="alert.props"
        :class="alertClasses"
        :style="getTopStyle(index)"
        @click="removeAlert(alert.id)"
      >
        {{ alert.message }}
      </v-alert>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { VAlert } from 'vuetify/components';
import { useDisplay } from 'vuetify';
import { useAlertStore } from '@/store/alert';

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
        ? ['tw-absolute', 'tw-z-[9999]', 'tw-inset-x-[15px]', 'tw-w-auto']
        : ['tw-absolute', 'tw-z-[9999]', 'tw-inset-x-[20%]', 'tw-w-auto']
    );

    const getTopStyle = (index: number) => {
      const topPosition = 150 + index * 80; // 每个alert之间的间隔为50px
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
