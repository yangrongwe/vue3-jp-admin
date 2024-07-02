import { createApp } from 'vue';
import './styles/index.css';
import App from './App.vue';

import router from './router';
import vuetify from './plugins/vuetify/index.ts';
import pinia from './plugins/pinia/index.ts';
import i18n from './plugins/i18n.ts';

import VXETable from 'vxe-table';
import 'vxe-table/lib/style.css';

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(i18n);
app.use(vuetify);
app.use(VXETable);
app.mount('#app');
