import { defineStore } from 'pinia';

interface Alert {
  id: number;
  message: string;
  color: 'info' | 'success' | 'warning' | 'error';
  timeout: number;
  props: Record<string, any>; // 包含所有 v-alert 的属性
}

export const useAlertStore = defineStore('alert', {
  state: () => ({
    alerts: [] as Alert[],
  }),
  actions: {
    addAlert(alert: Omit<Alert, 'id'>) {
      const id = Date.now();
      const newAlert = { ...alert, id };
      this.alerts.push(newAlert);
      if (alert.timeout) {
        setTimeout(() => {
          this.removeAlert(id);
        }, alert.timeout);
      }
    },
    removeAlert(id: number) {
      this.alerts = this.alerts.filter((alert) => alert.id !== id);
      if (this.alerts.length === 0) {
        this.$reset();
      }
    },
    clearAlerts() {
      this.alerts = [];
    },
  },
});
