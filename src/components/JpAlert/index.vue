<template>
  <v-alert :type="color" :class="alertClasses">
    {{ message }}
  </v-alert>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import { VAlert } from 'vuetify/components';
import { useDisplay } from 'vuetify';

export default defineComponent({
  name: 'AlertComponent',
  components: {
    VAlert,
  },
  props: {
    message: {
      type: String as PropType<string>,
      required: true,
    },
    color: {
      type: String as PropType<'info' | 'success' | 'warning' | 'error'>,
      default: 'info',
    },
  },
  setup() {
    const { mobile } = useDisplay();
    const alertClasses = computed(() =>
      mobile.value
        ? [
            'tw-absolute',
            'tw-top-[120px]',
            'tw-z-[9999]',
            'tw-inset-x-[15px]',
            'tw-w-auto',
          ]
        : [
            'tw-absolute',
            'tw-top-[120px]',
            'tw-z-[9999]',
            'tw-inset-x-[20%]',
            'tw-w-auto',
          ]
    );

    return {
      alertClasses,
    };
  },
});
</script>

<style scoped lang="scss">
//
</style>
