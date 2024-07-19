import { showAlert, clearAllAlerts } from '@/utils/dynamicAlert';

const handleShowAlert = () => {
  showAlert({
    message: 'This is an alert message!',
    color: 'success',
  });
};

const handleClearAllAlerts = () => {
  clearAllAlerts();
};

export { handleShowAlert, handleClearAllAlerts };
