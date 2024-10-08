// i18nUtils.ts
import i18n from './i18n';

const $t = (key: string) => i18n.global.t(key);

function setLanguageToLocalStorage(locale: string): void {
  localStorage.setItem('app-lang', locale);
}

function getLanguageFromLocalStorage(): string {
  let userLanguage = navigator.language || navigator.languages[0];

  if (userLanguage != 'ja' && userLanguage != 'zh-CN' && userLanguage != 'en') {
    userLanguage = 'ja';
  }

  return localStorage.getItem('app-lang') || userLanguage || 'ja';
}

export { $t, setLanguageToLocalStorage, getLanguageFromLocalStorage };
