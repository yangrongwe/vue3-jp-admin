import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import lightTheme from './lightTheme.js';
import jp_ja from '@/locales/ja.json';
import { ja } from 'vuetify/locale';

const vuetify = createVuetify({
  locale: {
    locale: 'ja',
    fallback: 'jp_ja',
    messages: { ja, jp_ja },
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: lightTheme,
    },
  },
  defaults: {
    // VCard: {
    //   VBtn: { variant: 'outlined' },
    // },
    // VDialog: {},
    VBtn: {
      color: 'primary',
      variant: 'outlined',
    },
  },
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
});

export default vuetify;
