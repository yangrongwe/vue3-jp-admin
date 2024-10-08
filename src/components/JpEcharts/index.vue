<!-- src/components/EChartsComponent.vue -->
<template>
  <div ref="chart" class="chart"></div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';
import * as echarts from 'echarts';

const props = defineProps({
  options: {
    type: Object,
    required: true,
  },
});

const chart = ref(null);
let myChart = null;

onMounted(() => {
  myChart = echarts.init(chart.value);
  myChart.setOption(props.options);

  window.addEventListener('resize', resizeChart);
});

onUnmounted(() => {
  window.removeEventListener('resize', resizeChart);
  if (myChart) {
    myChart.dispose();
  }
});

const resizeChart = () => {
  if (myChart) {
    myChart.resize();
  }
};

watch(
  () => props.options,
  (newOptions) => {
    if (myChart) {
      myChart.setOption(newOptions);
    }
  },
  { deep: true }
);
</script>

<style scoped>
.chart {
  width: 100%;
  height: 400px;
}
</style>
