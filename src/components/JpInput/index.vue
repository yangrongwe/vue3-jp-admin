<template>
  <v-text-field v-bind="$attrs" bg-color="white">
    <template v-for="(obj, name) in $slots" v-slot:[name]="data">
      <slot :name="name" v-bind="data" />
    </template>
  </v-text-field>
</template>
<script setup lang="ts">
import { ref } from 'vue';
</script>
<style lang="scss"></style>
