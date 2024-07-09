// i18nUtils.ts
import i18n from './i18n';

const $t = (key: string) => i18n.global.t(key);

export { $t };
