import { createApp } from 'vue';
import App from './App.vue';

import router from './router';
import vuetify from './plugins/vuetify/index.ts';
import pinia from './plugins/pinia/index.ts';
import i18n from './plugins/i18n/i18n.ts';
// import VXETable from 'vxe-table';

// import VxeUI from 'vxe-pc-ui';
// import 'vxe-pc-ui/lib/style.css';

import './styles/index.css';
// import 'vxe-table/lib/style.css';
import { VxeTable } from '@/plugins/vxeTable/index.ts';

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(i18n);
app.use(vuetify);
app.use(VxeTable);

app.mount('#app');

export { app };
