import { showAlert, clearAllAlerts } from '@/utils/dynamicAlert';

const handleShowAlert = () => {
  let count = 0;
  const id = setInterval(() => {
    if (count == 3) {
      clearInterval(id);
    }
    showAlert({
      message: 'This is an alert message!' + count,
      props: {
        dismissible: true,
        elevation: 2,
        variant: 'tonal',
        type: 'success',
        closable: true,
      },
    });
    count++;
  }, 300);
};

const handleClearAllAlerts = () => {
  clearAllAlerts();
};

export { handleShowAlert, handleClearAllAlerts };
