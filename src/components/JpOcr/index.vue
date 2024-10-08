<template>
  <div class="p-4">
    <h1 class="text-xl mb-4">OCR 识别示例</h1>

    <input
      type="file"
      @change="handleFileChange"
      accept="image/*"
      class="mb-4"
    />

    <div v-if="result">
      <h2 class="text-lg mb-2">识别结果:</h2>
      <p>{{ result }}</p>
      <p v-if="totalAmount">合計金額: {{ totalAmount }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Tesseract from 'tesseract.js';

const result = ref('');
const totalAmount = ref('');

const handleFileChange = async (event) => {
  const file = event.target.files[0];
  if (file) {
    try {
      const {
        data: { text },
      } = await Tesseract.recognize(file, 'jpn', {
        logger: (m) => console.log(m), // 可选：查看识别过程的日志
      });
      result.value = text;

      // 查找并提取“合計金额”
      const totalMatch = text.match(/No\s*([\d,\.]+)/);
      if (totalMatch) {
        totalAmount.value = totalMatch[1];
      } else {
        totalAmount.value = '未找到合計金額';
      }
    } catch (error) {
      result.value = '识别失败，请重试。';
      console.error(error);
    }
  }
};
</script>

<style scoped>
/* 样式可以根据需要进行调整 */
</style>
