// i18n.js

import { createI18n } from 'vue-i18n';
import enLocale from '../locales/en.json';
import jaLocale from '../locales/ja.json';

const messages = {
  en: enLocale,
  jp: jaLocale,
};

const i18n = createI18n({
  legacy: false, // 使用 Composition API
  locale: 'en', // 默认语言
  messages,
});

export default i18n;
