<template>
  <HighlightCode :code="VNodeCode"></HighlightCode>
</template>
<script setup>
import { ref } from 'vue';
import HighlightCode from './HighlightCode.vue';
const VNodeCode = ref(`
  // use method
  import MyComponent from './MyComponent.vue';
  openModal({
        component: MyComponent,
        props: {
          title: 'VNode Modal',
          width: '600',
        },
    });
`);
</script>
