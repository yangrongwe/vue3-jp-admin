import { type ThemeDefinition } from 'vuetify';
const lightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    primary: '#409eff',
    secondary: '#48A9A6',
    error: '#B00020',
    info: '#409eff',
    success: '#4CAF50',
    warning: '#FB8C00',
    // surface
    'surface-variant': '#424242',
    // 导航栏
    'navigation-drawer-background': '#FFFFFF',
    'app-bar-primary': '#FFFFFF',
    // 主界面tab标签颜色
    'tab-color': '#409eff',
    'tab-bg-color': '#FFFFFF',
    'tab-slider-color': '#409eff',
    'tab-selected-bg-color': '#f5f5f5',
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
