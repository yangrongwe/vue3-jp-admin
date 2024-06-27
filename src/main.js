import { createApp } from 'vue';
import './styles/index.css';
import App from './App.vue';

import { createPinia } from 'pinia';
import router from './router';
import vuetify from './plugins/vuetify/index.ts';
import VXETable from 'vxe-table';
import 'vxe-table/lib/style.css';

import apiService from './utils/api.ts';
import i18n from './plugins/i18n.ts';

const app = createApp(App);
const pinia = createPinia();

app.config.globalProperties.$apiService = apiService;
app.config.globalProperties.$t = i18n.global.t;

app.use(pinia);
app.use(router);
app.use(i18n);
app.use(vuetify);
app.use(VXETable);
app.mount('#app');
