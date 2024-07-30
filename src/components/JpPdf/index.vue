<template>
  <div class="tw-container tw-mx-auto tw-p-4">
    <div class="tw-flex tw-justify-between tw-mb-4">
      <div>
        <v-btn @click="prevPage" class="tw-btn" :disabled="isAllPages">
          前のページ
        </v-btn>
        <v-btn @click="nextPage" class="tw-btn" :disabled="isAllPages">
          次のページ
        </v-btn>
      </div>
      <div class="tw-flex tw-items-center">
        <v-btn @click="zoomOut" :disabled="zoomOutDisabled" class="tw-btn">
          縮小
        </v-btn>
        <input
          type="number"
          v-model.number="zoomPercentage"
          @change="updateZoom"
          class="tw-mx-2 tw-text-center tw-w-20"
          min="10"
          step="1"
        />
        <v-btn @click="zoomIn" :disabled="zoomInDisabled" class="tw-btn">
          拡大
        </v-btn>
      </div>
      <div>
        <v-btn @click="downloadPDF" class="tw-btn">ダウンロード</v-btn>
        <v-btn @click="reset" class="tw-btn tw-bg-red-500">リセット</v-btn>
        <v-btn @click="toggleView" class="tw-btn">
          {{ isAllPages ? '単ページ表示' : '全ページ表示' }}
        </v-btn>
        <v-btn @click="rotateLeft" class="tw-btn"> 左に回転 </v-btn>
        <v-btn @click="rotateRight" class="tw-btn"> 右に回転 </v-btn>
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
      <template v-if="isAllPages"> ページ総数: {{ totalPages }} </template>
      <template v-else> ページ {{ currentPage }} / {{ totalPages }} </template>
    </div>
    <div ref="textLayer" class="tw-text-layer"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import { useResizeObserver } from '@vueuse/core';
import pdf from '@/assets/helloworld.pdf';
import { TextLayerBuilder } from 'pdfjs-dist/web/pdf_viewer.mjs';
import 'pdfjs-dist/web/pdf_viewer.css';

GlobalWorkerOptions.workerSrc =
  '../../../node_modules/pdfjs-dist/build/pdf.worker.mjs';

const pdfUrl = pdf;
const pdfCanvas = ref<HTMLCanvasElement | null>(null);
const pdfContainer = ref<HTMLDivElement | null>(null);
const currentPage = ref(1);
const totalPages = ref(0);
const scale = ref(1.5);
const zoomPercentage = ref(150);
const maxZoom = 4.0;
const minZoom = 0.1;
const rotation = ref(0);

const isAllPages = ref(false);
const initialScale = 1.5;
const initialZoomPercentage = 150;
const initialOffsetX = 0;
const initialOffsetY = 0;

const zoomInDisabled = computed(() => scale.value >= maxZoom);
const zoomOutDisabled = computed(() => scale.value <= minZoom);

let renderTask: Promise<void> | null = null;
let pendingRender = false;
let isDragging = false;
let startX = 0;
let startY = 0;
let offsetX = initialOffsetX;
let offsetY = initialOffsetY;
const textLayer = ref<HTMLDivElement | null>(null);

const renderPDF = async (pageNum?: number) => {
  if (pdfCanvas.value && textLayer.value) {
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

    if (isAllPages.value) {
      let totalHeight = 0;
      let maxWidth = 0;
      for (let i = 1; i <= totalPages.value; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: scale.value });
        totalHeight += viewport.height;
        maxWidth = Math.max(maxWidth, viewport.width);
      }

      pdfCanvas.value.height = totalHeight * window.devicePixelRatio;
      pdfCanvas.value.width = maxWidth * window.devicePixelRatio;
      context?.scale(window.devicePixelRatio, window.devicePixelRatio);

      for (let i = 1; i <= totalPages.value; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: scale.value });
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        renderTask = page.render(renderContext).promise;
        await renderTask;

        context.translate(0, viewport.height);
      }
    } else {
      const page = await pdf.getPage(pageNum || 1);
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
    }
    // Clear the previous text layer content
    if (textLayer.value) {
      textLayer.value.innerHTML = '';
    }

    if (isAllPages.value) {
      for (let i = 1; i <= totalPages.value; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: scale.value });
        const textLayerBuilder = new TextLayerBuilder({
          pdfPage: page,
          highlighter: null,
          accessibilityManager: null,
          enablePermissions: false,
        });
        textLayerBuilder.div = textLayer.value!;
        await textLayerBuilder.render(viewport);
      }
    } else {
      const page = await pdf.getPage(pageNum || 1);
      const viewport = page.getViewport({ scale: scale.value });
      const textLayerBuilder = new TextLayerBuilder({
        pdfPage: page,
        highlighter: null,
        accessibilityManager: null,
        enablePermissions: false,
      });
      textLayerBuilder.div = textLayer.value!;
      await textLayerBuilder.render(viewport);
    }
    pendingRender = false;
    centerCanvas();
  }
};

const zoomIn = () => {
  if (scale.value < maxZoom) {
    scale.value *= 1.1;
    zoomPercentage.value = Math.round(scale.value * 100);
    renderPDF(isAllPages.value ? undefined : currentPage.value);
  }
};

const zoomOut = () => {
  if (scale.value > minZoom) {
    scale.value /= 1.1;
    zoomPercentage.value = Math.round(scale.value * 100);
    renderPDF(isAllPages.value ? undefined : currentPage.value);
  }
};

const updateZoom = () => {
  scale.value = zoomPercentage.value / 100;
  scale.value = Math.min(Math.max(scale.value, minZoom), maxZoom);
  renderPDF(isAllPages.value ? undefined : currentPage.value);
};

const prevPage = () => {
  if (currentPage.value > 1 && !isAllPages.value) {
    currentPage.value--;
    renderPDF(currentPage.value);
  } else if (isAllPages.value) {
    renderPDF();
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value && !isAllPages.value) {
    currentPage.value++;
    renderPDF(currentPage.value);
  } else if (isAllPages.value) {
    renderPDF();
  }
};

const downloadPDF = () => {
  const link = document.createElement('a');
  link.href = pdfUrl;
  link.download = 'your.pdf';
  link.click();
};

const reset = () => {
  scale.value = initialScale;
  zoomPercentage.value = initialZoomPercentage;
  offsetX = initialOffsetX;
  offsetY = initialOffsetY;
  rotation.value = 0;

  if (pdfCanvas.value) {
    pdfCanvas.value.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${rotation.value}deg)`;
    centerCanvas();
  }

  if (pdfContainer.value) {
    pdfContainer.value.scrollTop = 0;
    pdfContainer.value.scrollLeft = 0;
  }

  renderPDF(isAllPages.value ? undefined : currentPage.value);
};

const toggleView = () => {
  isAllPages.value = !isAllPages.value;
  if (isAllPages.value) {
    renderPDF();
  } else {
    renderPDF(currentPage.value);
  }
};

const rotateLeft = () => {
  rotation.value -= 90;
  if (pdfCanvas.value) {
    pdfCanvas.value.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${rotation.value}deg)`;
  }
};

const rotateRight = () => {
  rotation.value += 90;
  if (pdfCanvas.value) {
    pdfCanvas.value.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${rotation.value}deg)`;
  }
};

const centerCanvas = () => {
  if (pdfCanvas.value && pdfContainer.value) {
    const containerWidth = pdfContainer.value.clientWidth;
    const canvasWidth = pdfCanvas.value.width;

    const offsetX = (containerWidth - canvasWidth) / 2;

    pdfCanvas.value.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${rotation.value}deg)`;
  }
};

const startDrag = (event: MouseEvent) => {
  isDragging = true;
  startX = event.clientX - offsetX;
  startY = event.clientY - offsetY;
};

const stopDrag = () => {
  isDragging = false;
};

const drag = (event: MouseEvent) => {
  if (isDragging && pdfCanvas.value) {
    offsetX = event.clientX - startX;
    offsetY = event.clientY - startY;
    pdfCanvas.value.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${rotation.value}deg)`;
  }
};

onMounted(() => {
  if (pdfContainer.value) {
    useResizeObserver(pdfContainer.value, () => {
      centerCanvas();
      renderPDF(isAllPages.value ? undefined : currentPage.value);
    });
  }

  renderPDF(isAllPages.value ? undefined : currentPage.value);
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
  height: 500px;
  overflow: auto;
}

.tw-canvas {
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.1s;
  cursor: grab;
}
</style>
