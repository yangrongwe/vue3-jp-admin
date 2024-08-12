// i18nUtils.ts
import i18n from './i18n';

const $t = (key: string) => i18n.global.t(key);

function setLanguageToLocalStorage(locale: string): void {
  localStorage.setItem('app-lang', locale);
}

function getLanguageFromLocalStorage(): string {
  return localStorage.getItem('app-lang') || 'ja';
}

export { $t, setLanguageToLocalStorage, getLanguageFromLocalStorage };
