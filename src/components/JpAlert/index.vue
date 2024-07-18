<template>
  <v-alert
    closable
    v-bind="$attrs"
    border="start"
    :model-value="props.show"
    max-height="100"
  ></v-alert>
</template>
<script setup lang="ts">
interface AlertProps {
  show?: boolean;
}
const props = withDefaults(defineProps<AlertProps>(), {
  show: false,
  //   labels: () => ['one', 'two']
});
</script>
