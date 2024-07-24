<template>
  <div v-if="item.props.type === 'password'">
    <v-text-field
      v-bind="$attrs"
      bg-color="white"
      :type="passwordVisible ? 'text' : 'password'"
      :append-inner-icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
      @click:append-inner="passwordVisible = !passwordVisible"
    >
    </v-text-field>
  </div>
  <div v-else>
    <v-text-field v-bind="$attrs" bg-color="white"> </v-text-field>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});

const passwordVisible = ref(false);
</script>
<style lang="scss"></style>
