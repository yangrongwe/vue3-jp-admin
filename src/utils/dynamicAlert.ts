import { createApp, h, App as VueApp } from 'vue';
import AlertComponent from '@/components/JpAlert/index.vue';
import { useAlertStore } from '@/store/alert';
import vuetify from '@/plugins/vuetify/index.ts';

interface AlertOptions {
  message: string;
  color?: 'info' | 'success' | 'warning' | 'error';
  timeout?: number;
}

// 创建一个全局变量用于存储挂载的应用实例和挂载点
let appInstance: VueApp<Element> | null = null;
let mountPoint: HTMLElement | null = null;

export function showAlert(options: AlertOptions): void {
  const { message, color = 'info', timeout = 80000 } = options;

  if (!appInstance) {
    // 创建应用实例
    appInstance = createApp({
      render() {
        return h(AlertComponent, { message, color });
      },
    });
    appInstance.use(vuetify);

    // 创建挂载点并挂载
    mountPoint = document.createElement('div');
    document.body.appendChild(mountPoint);
    appInstance.mount(mountPoint);
  } else {
    // 更新已有的 alert 信息
    const alertStore = useAlertStore();
    alertStore.addAlert({ message, color, timeout });
  }

  // 使用 Pinia 管理状态
  const alertStore = useAlertStore();
  alertStore.addAlert({ message, color, timeout });

  // 设置超时清除机制
  if (timeout) {
    setTimeout(() => {
      clearAllAlerts();
    }, timeout);
  }
}

export function clearAllAlerts(): void {
  if (appInstance) {
    // 清除 Pinia 状态
    const alertStore = useAlertStore();
    alertStore.clearAlerts();

    // 卸载应用实例和移除挂载点
    if (mountPoint) {
      document.body.removeChild(mountPoint);
      mountPoint = null;
    }
    appInstance.unmount();
    appInstance = null;
  }
}
