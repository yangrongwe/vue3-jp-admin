<template>
  <div class="tw-container tw-mx-auto tw-p-4">
    <div class="tw-flex tw-justify-between tw-mb-4">
      <div>
        <button @click="prevPage" class="tw-btn">前のページ</button>
        <button @click="nextPage" class="tw-btn">次のページ</button>
      </div>
      <div class="tw-flex tw-items-center">
        <button @click="zoomOut" :disabled="zoomOutDisabled" class="tw-btn">
          縮小
        </button>
        <input
          type="number"
          v-model.number="zoomPercentage"
          @change="updateZoom"
          class="tw-mx-2 tw-text-center tw-w-20"
          min="10"
          step="1"
        />
        <button @click="zoomIn" :disabled="zoomInDisabled" class="tw-btn">
          拡大
        </button>
      </div>
      <div>
        <button @click="downloadPDF" class="tw-btn">ダウンロード</button>
        <button @click="reset" class="tw-btn tw-bg-red-500">リセット</button>
        <!-- 新的还原按钮 -->
      </div>
    </div>
    <div
      ref="pdfContainer"
      class="tw-relative tw-overflow-auto tw-border tw-border-gray-300"
      @mousedown="startDrag"
      @mouseup="stopDrag"
      @mousemove="drag"
    >
      <canvas ref="pdfCanvas" class="tw-canvas"></canvas>
    </div>
    <div class="tw-text-center tw-mt-4">
      ページ {{ currentPage }} / {{ totalPages }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import { useResizeObserver } from '@vueuse/core';
import pdf from '@/assets/helloworld.pdf';
// 设置 workerSrc 为本地路径中的 pdf.worker.mjs
GlobalWorkerOptions.workerSrc =
  '../../../node_modules/pdfjs-dist/build/pdf.worker.mjs';

const pdfUrl = pdf;
const pdfCanvas = ref<HTMLCanvasElement | null>(null);
const pdfContainer = ref<HTMLDivElement | null>(null);
const currentPage = ref(1);
const totalPages = ref(0);
const scale = ref(1.5);
const zoomPercentage = ref(150); // 初始化为 150%
const maxZoom = 4.0; // 最大缩放比例
const minZoom = 0.1; // 最小缩放比例

const initialScale = 1.5; // 初始缩放比例
const initialZoomPercentage = 150; // 初始缩放百分比
const initialOffsetX = 0; // 初始X偏移
const initialOffsetY = 0; // 初始Y偏移

const zoomInDisabled = computed(() => scale.value >= maxZoom);
const zoomOutDisabled = computed(() => scale.value <= minZoom);

let renderTask: Promise<void> | null = null;
let pendingRender = false;
let isDragging = false;
let startX = 0;
let startY = 0;
let offsetX = initialOffsetX; // X偏移初始化
let offsetY = initialOffsetY; // Y偏移初始化

const renderPDF = async (pageNum: number) => {
  if (pdfCanvas.value) {
    if (renderTask) {
      await renderTask;
    }

    if (pendingRender) {
      return;
    }

    const context = pdfCanvas.value.getContext('2d');
    if (context) {
      context.clearRect(0, 0, pdfCanvas.value.width, pdfCanvas.value.height);
    }

    pendingRender = true;
    const loadingTask = getDocument(pdfUrl);
    const pdf = await loadingTask.promise;
    totalPages.value = pdf.numPages;

    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale: scale.value });
    pdfCanvas.value.height = viewport.height * window.devicePixelRatio;
    pdfCanvas.value.width = viewport.width * window.devicePixelRatio;
    context?.scale(window.devicePixelRatio, window.devicePixelRatio);

    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };

    renderTask = page.render(renderContext).promise;
    await renderTask;
    pendingRender = false;

    // 调整canvas位置
    centerCanvas();
  }
};

const zoomIn = () => {
  if (scale.value < maxZoom) {
    scale.value *= 1.1;
    zoomPercentage.value = Math.round(scale.value * 100);
    renderPDF(currentPage.value);
  }
};

const zoomOut = () => {
  if (scale.value > minZoom) {
    scale.value /= 1.1;
    zoomPercentage.value = Math.round(scale.value * 100);
    renderPDF(currentPage.value);
  }
};

const updateZoom = () => {
  scale.value = zoomPercentage.value / 100;
  scale.value = Math.min(Math.max(scale.value, minZoom), maxZoom);
  renderPDF(currentPage.value);
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    renderPDF(currentPage.value);
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    renderPDF(currentPage.value);
  }
};

const downloadPDF = () => {
  const link = document.createElement('a');
  link.href = pdfUrl;
  link.download = 'your.pdf';
  link.click();
};

const reset = () => {
  // 还原到初始状态
  scale.value = initialScale;
  zoomPercentage.value = initialZoomPercentage;
  offsetX = initialOffsetX;
  offsetY = initialOffsetY;

  if (pdfCanvas.value) {
    pdfCanvas.value.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    centerCanvas(); // 确保canvas在还原时居中显示
  }

  renderPDF(currentPage.value);
};

// 计算canvas X 轴居中显示
const centerCanvas = () => {
  if (pdfCanvas.value && pdfContainer.value) {
    const containerWidth = pdfContainer.value.clientWidth;
    const canvasWidth = pdfCanvas.value.width;

    const offsetX = (containerWidth - canvasWidth) / 2;

    pdfCanvas.value.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  }
};

const startDrag = (event: MouseEvent) => {
  if (pdfCanvas.value) {
    isDragging = true;
    startX = event.clientX - offsetX;
    startY = event.clientY - offsetY;
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
  }
};

const drag = (event: MouseEvent) => {
  if (isDragging && pdfCanvas.value && pdfContainer.value) {
    const containerRect = pdfContainer.value.getBoundingClientRect();
    const canvasRect = pdfCanvas.value.getBoundingClientRect();

    // 计算新的偏移量
    let newOffsetX = event.clientX - startX;
    let newOffsetY = event.clientY - startY;

    // 限制拖动范围，允许canvas部分内容超出容器边界
    const maxOffsetX = Math.min(0, -canvasRect.width + containerRect.width);
    const maxOffsetY = Math.min(0, -canvasRect.height + containerRect.height);

    newOffsetX = Math.max(newOffsetX, maxOffsetX);
    newOffsetY = Math.max(newOffsetY, maxOffsetY);

    offsetX = newOffsetX;
    offsetY = newOffsetY;

    // 更新canvas位置
    pdfCanvas.value.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  }
};

const stopDrag = () => {
  isDragging = false;
  document.removeEventListener('mousemove', drag);
  document.removeEventListener('mouseup', stopDrag);
};

onMounted(() => {
  renderPDF(currentPage.value);
});

useResizeObserver(pdfContainer, () => {
  renderPDF(currentPage.value);
});
</script>

<style scoped>
.tw-btn {
  @apply tw-bg-blue-500 tw-text-white tw-px-4 tw-py-2 tw-rounded tw-mx-1;
}

input[type='number'] {
  @apply tw-border tw-border-gray-300 tw-rounded tw-px-2 tw-py-1;
}

.tw-relative {
  position: relative;
  width: 100%;
  height: 500px; /* 可以调整为所需的固定高度 */
  overflow: auto; /* 允许滚动 */
}

.tw-canvas {
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.1s; /* 平滑拖动效果 */
  cursor: grab; /* 提示用户可以拖动 */
}
</style>
