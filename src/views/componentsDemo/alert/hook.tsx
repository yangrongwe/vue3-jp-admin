import { showAlert, clearAllAlerts } from '@/utils/dynamicAlert';
import { MainTitle } from '@/types/index';
const mainTitle: MainTitle = {
  title: 'Vuetify3 アラート　カプセル化【関数式呼び出し】',
  linkText: 'src/views/componentsDemo/alert/index.vue',
  path: 'https://github.com/yangrongwe/vue3-jp-admin/blob/main/src/views/componentsDemo/alert/index.vue',
};
const handleShowAlert = (btnIndex: number) => {
  switch (btnIndex) {
    case 1:
      showAlert({
        message: 'This is an alert default!',
        props: {
          closable: true,
        },
      });
      break;
    case 2:
      showAlert({
        message: 'This is an alert outlined!',
        props: {
          variant: 'outlined',
          closable: true,
        },
      });
      break;
    case 3:
      showAlert({
        message: 'This is an alert tonal!',
        props: {
          variant: 'tonal',
          closable: true,
        },
      });
      break;
    case 4:
      showAlert({
        message: 'This is an alert info!',
        props: {
          type: 'info',
          closable: true,
          border: 'start',
          borderColor: 'white',
        },
      });
      break;
    case 5:
      showAlert({
        message: 'This is an alert success!',
        props: {
          type: 'success ',
          closable: true,
          border: 'top',
          borderColor: 'white',
        },
      });
      break;
    case 6:
      showAlert({
        message: 'This is an alert warning!',
        props: {
          type: 'warning ',
          closable: true,
          border: 'bottom',
          borderColor: 'white',
        },
      });
      break;
    case 7:
      showAlert({
        message: 'This is an alert error!',
        props: {
          type: 'error',
          closable: true,
          border: 'end',
          borderColor: 'white',
        },
      });
      break;
    case 8:
      showAlert({
        message: 'This is an alert timeout!',
        timeout: 3000,
        props: {
          type: 'info',
          closable: true,
          border: 'start',
          borderColor: 'white',
        },
      });
      break;
    default:
      break;
  }
};

const handleClearAllAlerts = () => {
  clearAllAlerts();
};

export { handleShowAlert, handleClearAllAlerts, mainTitle };
