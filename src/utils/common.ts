import { v4 as uuidv4 } from 'uuid';

// 在组件挂载时创建一个全局的 style 元素
const styleElement = document.createElement('style');
document.head.appendChild(styleElement);

export const useAddCustomStyle = (style) => {
  // 动态添加 CSS 规则的方法
  let className = `class-${uuidv4()}`;
  const cssRule = `.${className}${style}`;
  styleElement.sheet.insertRule(cssRule, styleElement.sheet.cssRules.length);

  return className;
};
