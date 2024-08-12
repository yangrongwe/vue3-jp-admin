// i18n.js

import { createI18n } from 'vue-i18n';
import enLocale from '../../locales/en.json';
import jaLocale from '../../locales/ja.json';
import zhLocale from '../../locales/zh.json';
import { getLanguageFromLocalStorage } from './i18nUtils';

const messages = {
  en: enLocale,
  ja: jaLocale,
  zh: zhLocale,
};

const i18n = createI18n({
  legacy: false,
  locale: getLanguageFromLocalStorage(),
  messages,
});

export default i18n;
