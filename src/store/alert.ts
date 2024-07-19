import { defineStore } from 'pinia';

export const useAlertStore = defineStore('alert', {
  state: () => ({
    alerts: [],
  }),
  actions: {
    addAlert({ message, color = 'info', timeout = 3000 }) {
      const alert = { message, color, timeout, id: Date.now() };
      this.alerts.push(alert);
      if (timeout) {
        setTimeout(() => {
          this.removeAlert(alert.id);
        }, timeout);
      }
    },
    removeAlert(id) {
      const index = this.alerts.findIndex((alert) => alert.id === id);
      if (index !== -1) {
        this.alerts.splice(index, 1);
      }
    },
    clearAlerts() {
      this.alerts = [];
    },
  },
  getters: {
    // 这里可以添加其他 getter 以支持从 state 计算的属性
  },
});
