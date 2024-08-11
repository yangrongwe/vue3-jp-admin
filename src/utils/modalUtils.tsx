import { useModalStore } from '@/store/modalStore';
import { markRaw, render, h } from 'vue';
import CustomModal from '@/components/JpModal/index.vue';
import { app } from '../main.js';

// Vue アプリケーションのコンテキストを取得する関数
export function getAppContext() {
  return app._context; // _context は Vue アプリケーションインスタンスのコンテキストです
}

// モーダルを開くための関数
export function openModal({
  component = null,
  props = {},
  slots = {},
  callbackMethod = {},
}: {
  component: any; // モーダルに表示するコンポーネント
  props?: Record<string, any>; // コンポーネントに渡すプロパティ
  slots?: Record<string, any>; // コンポーネントのスロット
  callbackMethod?: Record<string, any>; // コールバックメソッド
}) {
  const modalStore = useModalStore();
  const componentRef = markRaw(component); // コンポーネントをマークして再レンダリングを防ぐ

  // モーダルストアを使ってモーダルを開く
  const id = modalStore.openModal(
    componentRef,
    { ...props },
    slots,
    callbackMethod
  );

  // 新しい div 要素を作成して body に追加する
  const modalElement = document.createElement('div');
  document.body.appendChild(modalElement);

  // CustomModal コンポーネントのインスタンスを作成する
  const modalInstance = h(CustomModal, { modalId: id });

  // Vuetify のエラーを回避するため、アプリケーションコンテキストを設定する
  modalInstance.appContext = getAppContext();

  // モーダルインスタンスを作成した div 要素にレンダリングする
  render(modalInstance, modalElement);

  return id; // モーダルの ID を返す
}

// 指定された ID のモーダルを閉じる関数
export function closeModal(id: string) {
  const modalStore = useModalStore();
  modalStore.closeModal(id);
}

// すべてのモーダルを閉じる関数
export function closeAllModals() {
  const modalStore = useModalStore();
  modalStore.closeAllModals();
}
