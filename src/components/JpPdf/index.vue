<template>
  <div class="tw-container tw-mx-auto tw-p-4">
    <div class="tw-flex tw-justify-between tw-mb-4">
      <div class="tw-flex tw-gap-2">
        <v-btn @click="prevPage" :disabled="isAllPages">
          {{ $t('views.pdf.prevPage') }}
        </v-btn>
        <v-btn @click="nextPage" :disabled="isAllPages">
          {{ $t('views.pdf.nextPage') }}
        </v-btn>
        <v-btn @click="toggleView">
          {{
            isAllPages
              ? $t('views.pdf.singlePageView')
              : $t('views.pdf.allPagesView')
          }}
        </v-btn>
      </div>
      <div class="tw-flex tw-items-center tw-gap-2">
        <v-btn @click="zoomOut" :disabled="zoomOutDisabled">
          {{ $t('views.pdf.zoomOut') }}
        </v-btn>
        <input
          type="number"
          v-model.number="zoomPercentage"
          @change="updateZoom"
          class="tw-mx-2 tw-text-center tw-w-20"
          min="10"
          step="1"
        />
        <v-btn @click="zoomIn" :disabled="zoomInDisabled">
          {{ $t('views.pdf.zoomIn') }}
        </v-btn>
      </div>
      <div class="tw-flex tw-gap-2">
        <v-btn @click="downloadPDF">{{ $t('views.pdf.download') }}</v-btn>
        <v-btn @click="reset">{{ $t('views.pdf.reset') }}</v-btn>

        <v-btn @click="rotateLeft">{{ $t('views.pdf.rotateLeft') }}</v-btn>
        <v-btn @click="rotateRight">{{ $t('views.pdf.rotateRight') }}</v-btn>
        <v-btn @click="alertText">{{ $t('views.pdf.alertText') }}</v-btn>
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
      <template v-if="isAllPages">
        {{ $t('views.pdf.totalPages', { count: totalPages }) }}
      </template>
      <template v-else>
        {{
          $t('views.pdf.pageInfo', { current: currentPage, total: totalPages })
        }}
      </template>
    </div>
    <div ref="textLayer" class="tw-text-layer" v-show="false"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import { useResizeObserver } from '@vueuse/core';
import { TextLayerBuilder } from 'pdfjs-dist/web/pdf_viewer.mjs';
import 'pdfjs-dist/web/pdf_viewer.css';
// PDF.jsのワーカーのパスを設定
GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.5.136/pdf.worker.mjs';

// コンポーネントのプロパティを定義
const props = defineProps({
  pdfUrl: {
    type: String,
    default: '',
  },
  pdfName: {
    type: String,
    default: 'test.pdf',
  },
  initialZoom: {
    type: Number,
    default: 150,
  },
  initialRotation: {
    type: Number,
    default: 0,
  },
});

const pdfUrl = ref(props.pdfUrl);
const pdfCanvas = ref<HTMLCanvasElement | null>(null);
const pdfContainer = ref<HTMLDivElement | null>(null);
const currentPage = ref(1);
const totalPages = ref(0);
const scale = ref(props.initialZoom / 100);
const zoomPercentage = ref(props.initialZoom);
const maxZoom = 4.0;
const minZoom = 0.1;
const rotation = ref(props.initialRotation);

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

// PDFをレンダリングする関数
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
    const loadingTask = getDocument(pdfUrl.value);
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

    // 以前のテキストレイヤーの内容をクリア
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

// ズームインの処理
const zoomIn = () => {
  if (scale.value < maxZoom) {
    scale.value *= 1.1;
    zoomPercentage.value = Math.round(scale.value * 100);
    renderPDF(isAllPages.value ? undefined : currentPage.value);
  }
};

// ズームアウトの処理
const zoomOut = () => {
  if (scale.value > minZoom) {
    scale.value /= 1.1;
    zoomPercentage.value = Math.round(scale.value * 100);
    renderPDF(isAllPages.value ? undefined : currentPage.value);
  }
};

// ズームの更新処理
const updateZoom = () => {
  scale.value = zoomPercentage.value / 100;
  scale.value = Math.min(Math.max(scale.value, minZoom), maxZoom);
  renderPDF(isAllPages.value ? undefined : currentPage.value);
};

// 前のページに移動する処理
const prevPage = () => {
  if (currentPage.value > 1 && !isAllPages.value) {
    currentPage.value--;
    renderPDF(currentPage.value);
  } else if (isAllPages.value) {
    renderPDF();
  }
};

// 次のページに移動する処理
const nextPage = () => {
  if (currentPage.value < totalPages.value && !isAllPages.value) {
    currentPage.value++;
    renderPDF(currentPage.value);
  } else if (isAllPages.value) {
    renderPDF();
  }
};

// PDFをダウンロードする処理
const downloadPDF = () => {
  const link = document.createElement('a');
  link.href = pdfUrl.value;
  link.download = props.pdfName;
  link.click();
};

// リセット処理
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

// 表示モードを切り替える処理
const toggleView = () => {
  isAllPages.value = !isAllPages.value;
  if (isAllPages.value) {
    renderPDF();
  } else {
    renderPDF(currentPage.value);
  }
};

// 左に回転する処理
const rotateLeft = () => {
  rotation.value -= 90;
  if (pdfCanvas.value) {
    pdfCanvas.value.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${rotation.value}deg)`;
  }
};

// 右に回転する処理
const rotateRight = () => {
  rotation.value += 90;
  if (pdfCanvas.value) {
    pdfCanvas.value.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${rotation.value}deg)`;
  }
};

// テキストレイヤーの内容をアラート表示する処理
const alertText = () => {
  alert(textLayer.value.innerText);
};

// キャンバスを中央に配置する処理
const centerCanvas = () => {
  if (pdfCanvas.value && pdfContainer.value) {
    const containerWidth = pdfContainer.value.clientWidth;
    const canvasWidth = pdfCanvas.value.width;

    const offsetX = (containerWidth - canvasWidth) / 2;

    pdfCanvas.value.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${rotation.value}deg)`;
  }
};

// ドラッグ開始の処理
const startDrag = (event: MouseEvent) => {
  isDragging = true;
  startX = event.clientX - offsetX;
  startY = event.clientY - offsetY;
};

// ドラッグ終了の処理
const stopDrag = () => {
  isDragging = false;
};

// ドラッグ中の処理
const drag = (event: MouseEvent) => {
  if (isDragging && pdfCanvas.value) {
    offsetX = event.clientX - startX;
    offsetY = event.clientY - startY;
    pdfCanvas.value.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${rotation.value}deg)`;
  }
};

// コンポーネントのマウント時に呼ばれる処理
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
