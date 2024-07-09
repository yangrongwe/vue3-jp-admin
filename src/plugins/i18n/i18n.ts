// i18n.js

import { createI18n } from 'vue-i18n';
import enLocale from '../../locales/en.json';
import jaLocale from '../../locales/ja.json';

const messages = {
  en: enLocale,
  ja: jaLocale,
};

const i18n = createI18n({
  legacy: false,
  locale: 'ja',
  messages,
});

const $t = (key: string) => i18n.global.t(key);
export default i18n;
