import { createApp, h } from 'vue';
import AlertComponent from '@/components/JpAlert/index.vue';
import { useAlertStore } from '@/store/alert';
import vuetify from '@/plugins/vuetify/index.ts';

interface AlertOptions {
  message: string;
  color?: 'info' | 'success' | 'warning' | 'error';
  timeout?: number;
  props?: Record<string, any>; // 包含所有 v-alert 的属性
}

// 创建一个全局变量用于存储挂载的应用实例和挂载点
let appInstance: ReturnType<typeof createApp> | null = null;
let mountPoint: HTMLElement | null = null;

export function showAlert(options: AlertOptions): void {
  const { message, color = 'info', timeout = 3000, props = {} } = options;

  if (!appInstance) {
    // 创建应用实例
    appInstance = createApp(AlertComponent);
    appInstance.use(vuetify);

    // 创建挂载点并挂载
    mountPoint = document.createElement('div');
    document.body.appendChild(mountPoint);
    appInstance.mount(mountPoint);
  }

  // 使用 Pinia 管理状态
  const alertStore = useAlertStore();
  alertStore.addAlert({ message, color, timeout, props });
}

export function clearAllAlerts(): void {
  const alertStore = useAlertStore();
  alertStore.clearAlerts();

  if (appInstance && mountPoint) {
    appInstance.unmount();
    document.body.removeChild(mountPoint);
    appInstance = null;
    mountPoint = null;
  }
}
