import { createApp } from 'vue';
import AlertComponent from '@/components/JpAlert/index.vue';
import { useAlertStore } from '@/store/alertStore';
import vuetify from '@/plugins/vuetify/index.ts';

interface AlertOptions {
  message: string;
  timeout?: number;
  props?: Record<string, any>; //  v-alert のprops
}

// グローバル変数の作成
let appInstance: ReturnType<typeof createApp> | null = null;
let mountPoint: HTMLElement | null = null;

export function showAlert(options: AlertOptions): void {
  const { message, timeout, props = {} } = options;

  if (!appInstance) {
    // アプリケーションインスタンスの作成
    appInstance = createApp(AlertComponent);
    appInstance.use(vuetify);

    // マウントポイントの作成とマウント
    mountPoint = document.createElement('div');
    document.body.appendChild(mountPoint);
    appInstance.mount(mountPoint);
  }

  // Piniaで状態管理
  const alertStore = useAlertStore();
  alertStore.addAlert({ message, timeout, props });
}

export function clearAllAlerts(): void {
  // Piniaで管理されている全てのアラートをクリア
  const alertStore = useAlertStore();
  alertStore.clearAlerts();

  // アプリケーションインスタンスとマウントポイントをアンマウントし、削除
  if (appInstance && mountPoint) {
    appInstance.unmount();
    document.body.removeChild(mountPoint);
    appInstance = null;
    mountPoint = null;
  }
}
