import { type ThemeDefinition } from 'vuetify';
const lightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    'navigation-drawer-background': '#FFFFFF',
    'app-bar-primary': '#FFFFFF',
    surface: '#FFFFFF',
    'surface-bright': '#FFFFFF',
    'surface-light': '#EEEEEE',
    'surface-variant': '#424242',
    'on-surface-variant': '#EEEEEE',
    primary: '#409eff',

    'primary-darken-1': '#1F5592',
    secondary: '#48A9A6',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#409eff',
    success: '#4CAF50',
    warning: '#FB8C00',
    // 主界面tab颜色
    'tab-color': '#409eff',
    'tab-slider-color': '#409eff',
    // header颜色
    'header-divider-color': '#409eff',
  },
  variables: {
    'border-color': '#000000',
    'border-opacity': 0.12,
    'high-emphasis-opacity': 0.87,
    'medium-emphasis-opacity': 0.6,
    'disabled-opacity': 0.38,
    'idle-opacity': 0.04,
    'hover-opacity': 0.04,
    'focus-opacity': 0.12,
    'selected-opacity': 0.08,
    'activated-opacity': 0.12,
    'pressed-opacity': 0.12,
    'dragged-opacity': 0.08,
    'theme-kbd': '#212529',
    'theme-on-kbd': '#FFFFFF',
    'theme-code': '#F5F5F5',
    'theme-on-code': '#000000',
  },
};
export default lightTheme;
