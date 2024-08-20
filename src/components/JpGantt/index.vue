<template>
  <div ref="ganttContainer" class="gantt-container"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import gantt from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import { useI18n } from 'vue-i18n';

// 获取 i18n 实例
const { locale, t } = useI18n();

// 接收父组件传递的 props
const props = defineProps({
  tasks: {
    type: Array,
    required: true,
  },
  localeConfig: {
    type: Object,
    required: false,
    default: () => ({}), // 默认配置为空对象
  },
});

const ganttContainer = ref(null);

// 处理 localeConfig 的函数
const getGanttLocaleConfig = () => {
  const currentLocale = locale.value;

  // 从 i18n 获取当前语言的配置
  const localeData = {
    date: {
      month_full: t('gantt.date.month_full'),
      month_short: t('gantt.date.month_short'),
      day_full: t('gantt.date.day_full'),
      day_short: t('gantt.date.day_short'),
    },
    labels: {
      new_task: t('gantt.labels.new_task'),
      dhx_cal_today_button: t('gantt.labels.dhx_cal_today_button'),
      day_tab: t('gantt.labels.day_tab'),
      week_tab: t('gantt.labels.week_tab'),
      month_tab: t('gantt.labels.month_tab'),
      new_event: t('gantt.labels.new_event'),
      icon_save: t('gantt.labels.icon_save'),
      icon_cancel: t('gantt.labels.icon_cancel'),
      icon_details: t('gantt.labels.icon_details'),
      icon_edit: t('gantt.labels.icon_edit'),
      icon_delete: t('gantt.labels.icon_delete'),
      confirm_closing: t('gantt.labels.confirm_closing'),
      confirm_deleting: t('gantt.labels.confirm_deleting'),
      section_description: t('gantt.labels.section_description'),
      section_time: t('gantt.labels.section_time'),
      column_text: t('gantt.labels.column_text'),
      column_start_date: t('gantt.labels.column_start_date'),
      column_duration: t('gantt.labels.column_duration'),
      column_add: t('gantt.labels.column_add'),
      link: t('gantt.labels.link'),
      confirm_link_deleting: t('gantt.labels.confirm_link_deleting'),
      link_start: t('gantt.labels.link_start'),
      link_end: t('gantt.labels.link_end'),
      type_task: t('gantt.labels.type_task'),
      type_project: t('gantt.labels.type_project'),
      type_milestone: t('gantt.labels.type_milestone'),
      minutes: t('gantt.labels.minutes'),
      hours: t('gantt.labels.hours'),
      days: t('gantt.labels.days'),
      weeks: t('gantt.labels.weeks'),
      months: t('gantt.labels.months'),
      years: t('gantt.labels.years'),
    },
  };

  return localeData;
};

// 初始化 Gantt
onMounted(() => {
  gantt.init(ganttContainer.value);

  // 获取 Gantt 的语言配置并应用到 Gantt
  const localeConfig = getGanttLocaleConfig();
  gantt.i18n.setLocale(localeConfig);

  // 解析任务数据
  gantt.parse({ data: props.tasks });
});

// 清理 Gantt 实例
onBeforeUnmount(() => {
  gantt.clearAll();
});
</script>

<style scoped>
.gantt-container {
  width: 100%;
  height: 600px;
}
</style>
