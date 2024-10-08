import { v4 as uuidv4 } from 'uuid';
import { useNow } from '@vueuse/core';

// 在组件挂载时创建一个全局的 style 元素
const styleElement = document.createElement('style');
document.head.appendChild(styleElement);

// 获取当前时间
const now = useNow();

// 动态添加 CSS 规则的方法
export const useAddCustomStyle = (style) => {
  let className = `class-${uuidv4()}`;
  const cssRule = `.${className}${style}`;
  styleElement.sheet.insertRule(cssRule, styleElement.sheet.cssRules.length);

  return className;
};

// 获取当前日期所在区间的7天日期
export const getWeekDates = () => {
  const today = new Date(now.value);
  const firstDayOfWeek = today.getDate() - today.getDay(); // 获取本周第一天
  const days = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(today.setDate(firstDayOfWeek + i));
    days.push(date.toISOString().split('T')[0]); // 返回 'YYYY-MM-DD' 格式
  }

  return days;
};
