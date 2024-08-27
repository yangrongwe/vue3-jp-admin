<template>
  <!-- メインのデモ用の div 要素 -->
  <div class="main-demo">
    <div
      class="tw-flex tw-flex-wrap tw-items-center tw-justify-center tw-gap-4"
    >
      <div class="tw-h-[210px] tw-w-[220px]">
        <!-- 日付ピッカー -->
        <vue-cal
          class="vuecal--blue-theme vuecal--date-picker demo"
          xsmall
          :selected-date="selectedDate"
          hide-view-selector
          :time="false"
          :transitions="false"
          active-view="month"
          :events="configInfo.events"
          :disable-views="['week', 'day']"
          @cell-click="handleDateClick"
        />
      </div>
      <div class="tw-flex-1">
        <!-- フル機能のカレンダー -->
        <vue-cal
          class="demo tw-min-h-[500px] tw-max-w-[1000px]"
          :selected-date="selectedDate"
          :editable-events="configInfo.editable"
          :locale="locale"
          v-bind="calenderConfig.props"
          :events="configInfo.events"
          @event-click="handleEventClick"
          @event-drag-create="handleEventCreate"
        >
          <template #split-label="{ split, view }">
            <!-- <v-icon
                :color="split.color"
                size="20"
                icon=" mdi-account-outline"
              ></v-icon> -->
            <strong :style="`color: ${split.color}`">{{ split.label }}</strong>
          </template>
        </vue-cal>
      </div>
    </div>
  </div>
</template>

<script setup lang="tsx">
import { ref, reactive } from 'vue';
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';
import { openModal } from '@/utils/modalUtils';
import { $t } from '@/plugins/i18n/i18nUtils';
import JpForm from '@/components/JpForm/index.vue';
import { JpFormOptions } from '@/components/JpForm/type.ts';
import { v4 as uuidv4 } from 'uuid';
import { useDateFormat } from '@vueuse/core';
import { useAddCustomStyle } from '@/utils/common';
import { useI18n } from 'vue-i18n';

// 国際化関数を取得
const { t } = useI18n();

// プロップスの定義
const props = defineProps({
  calenderConfig: {
    type: Object,
    required: true,
  },
});

// ロケール情報を管理するリアクティブな参照
const locale = ref({
  weekDays: t('views.calendar.weekDays').split(','),
  months: t('views.calendar.months').split(','),
  years: t('views.calendar.years'),
  year: t('views.calendar.year'),
  month: t('views.calendar.month'),
  week: t('views.calendar.week'),
  day: t('views.calendar.day'),
  today: t('views.calendar.today'),
  noEvent: t('views.calendar.noEvent'),
  allDay: t('views.calendar.allDay'),
  deleteEvent: t('views.calendar.deleteEvent'),
  createEvent: t('views.calendar.createEvent'),
  dateFormat: t('views.calendar.dateFormat'),
});
// カレンダー設定情報を管理する参照
const configInfo = ref(props.calenderConfig);

// 選択された日付を管理するリアクティブな参照
const selectedDate = ref(new Date());

// チップグループの定義
const chipGroup = [
  {
    text: t('views.calendar.deletable'),
    value: 'deletable',
  },
  {
    text: t('views.calendar.draggable'),
    value: 'draggable',
  },
  {
    text: t('views.calendar.resizable'),
    value: 'resizable',
  },
];
// JpForm コンポーネントへの参照
const formRef = ref(null);
// フォームのオプションを管理するリアクティブなオブジェクト
const formOptions = reactive<JpFormOptions>({
  formItems: [
    {
      // 入力項目の定義
      itemType: 'input',
      itemName: 'title',
      props: {
        type: 'text',
        label: t('views.calendar.form.title'),
        validateOn: 'blur',
      },
    },
    // 時間選択用の項目
    {
      itemType: 'timePicker',
      itemName: 'time',
      props: {
        type: 'timeRange',
        placeholder: $t('views.form.reminderTime.placeholder'),
      },
      eventHandlers: {
        change: (value) => {
          // 変更イベントを処理
        },
      },
    },
    {
      // テキストエリア項目の定義
      itemType: 'textarea',
      itemName: 'content',
      props: {
        label: t('views.calendar.form.content'),
        validateOn: 'blur',
      },
    },
    {
      // チップグループ項目の定義
      itemType: 'chipGroup',
      itemName: 'chipGroup',
      props: {
        // modelValue: [],
        defaultValue: [],
        chipGroupArr: chipGroup,
        filter: true,
        multiple: true,
      },
      eventHandlers: {
        //
      },
    },
    {
      // カラーピッカー項目の定義
      itemType: 'colorPicker',
      itemName: 'colorPicker',
      props: {
        // modelValue: [],
        defaultValue: '#27A779',
        hideInputs: true,
      },
      eventHandlers: {
        //
      },
    },
  ],
  rules: {},
});
// 配列内に特定の値が含まれているかを判定する関数
const getActionStatus = (arr: Array<string>, val: string) => {
  return arr.some((item) => item === val);
};
// 日付クリック時のハンドラ関数
function handleDateClick(date) {
  selectedDate.value = date;
}
// カレンダーイベントクリック時のハンドラ関数
const handleEventClick = (obj) => {
  // イベント作成のロジックを処理
  let oldEvents = configInfo.value.events;
  const oldEvent = configInfo.value.events.find((item) => {
    return item.id == obj.id;
  });
  formOptions.formItems[0].props.defaultValue = oldEvent.titleText;
  formOptions.formItems[1].props.defaultValue = {
    startTime: useDateFormat(new Date(oldEvent.start), 'HH:mm').value,
    endTime: useDateFormat(new Date(oldEvent.end), 'HH:mm').value,
  };
  formOptions.formItems[2].props.defaultValue = oldEvent.contentText;

  let chipGroupArr: string[] = [];
  if (oldEvent.deletable) {
    chipGroupArr.push('deletable');
  }
  if (oldEvent.draggable) {
    chipGroupArr.push('draggable');
  }
  if (oldEvent.resizable) {
    chipGroupArr.push('resizable');
  }
  formOptions.formItems[3].props.defaultValue = chipGroupArr;
  formOptions.formItems[4].props.defaultValue = oldEvent.bgColor;
  // 新規イベントポップアップを開く
  openModal({
    component: () => <JpForm ref={formRef} form-options={formOptions}></JpForm>,
    props: {
      title: t('views.calendar.form.edit'),
      width: '500',
    },
    callbackMethod: {
      onCloseCallback: () => {
        configInfo.value.events = [...oldEvents];
        return true;
      },
      onConfirmCallback: () => {
        const formattedDate = useDateFormat(
          new Date(oldEvent.start),
          'YYYY-MM-DD'
        ).value;
        const createTaskData = formRef.value.formData;
        // カスタムスタイルを追加
        const uniqueClassName = useAddCustomStyle(
          `{ background-color:${createTaskData.colorPicker}!important;color:white!important }`
        );
        configInfo.value.events.map(async (item) => {
          if (item.id == obj.id) {
            item.start = useDateFormat(
              formattedDate + createTaskData.time.startTime,
              'YYYY-MM-DD HH:mm'
            ).value;
            item.end = useDateFormat(
              formattedDate + createTaskData.time.endTime,
              'YYYY-MM-DD HH:mm'
            ).value;
            item.titleText = createTaskData.title;
            item.contentText = createTaskData.content;
            item.title = await getCustomTitle(createTaskData.title);
            item.content = await getCustomContent(createTaskData.content);
            item.class = uniqueClassName;
            item.background = true;
            (item.bgColor = createTaskData.colorPicker),
              (item.deletable = getActionStatus(
                createTaskData.chipGroup,
                'deletable'
              ));
            item.draggable = getActionStatus(
              createTaskData.chipGroup,
              'draggable'
            );
            item.resizable = getActionStatus(
              createTaskData.chipGroup,
              'resizable'
            );
          }
        });
        return true;
      },
    },
  });
};

// イベントドラッグ作成時のハンドラ関数
const handleEventCreate = (data) => {
  console.log('****');
  // イベント作成のロジックを処理
  let oldEvents = configInfo.value.events;
  // デフォルト値を設定
  formOptions.formItems[0].props.defaultValue = '';
  formOptions.formItems[1].props.defaultValue = {
    startTime: data.start.formatTime(),
    endTime: data.end.formatTime(),
  };
  formOptions.formItems[2].props.defaultValue = '';

  // 新規イベントポップアップを開く
  openModal({
    component: () => <JpForm ref={formRef} form-options={formOptions}></JpForm>,
    props: {
      title: t('views.calendar.form.create'),
      width: '500',
    },
    callbackMethod: {
      onCloseCallback: () => {
        configInfo.value.events = [...oldEvents];
        return true;
      },
      onConfirmCallback: async () => {
        const formattedDate = useDateFormat(
          new Date(data.start),
          'YYYY-MM-DD'
        ).value;
        const createTaskData = formRef.value.formData;
        // カスタムスタイルを追加
        const uniqueClassName = useAddCustomStyle(
          `{ background-color:${createTaskData.colorPicker}!important;color:white!important; }`
        );
        configInfo.value.events.push({
          id: uuidv4(),
          start: useDateFormat(
            formattedDate + createTaskData.time.startTime,
            'YYYY-MM-DD HH:mm'
          ).value,
          end: useDateFormat(
            formattedDate + createTaskData.time.endTime,
            'YYYY-MM-DD HH:mm'
          ).value,
          titleText: createTaskData.title,
          contentText: createTaskData.content,
          title: await getCustomTitle(createTaskData.title),
          content: await getCustomContent(createTaskData.content),
          class: uniqueClassName,
          bgColor: createTaskData.colorPicker,
          background: true,
          deletable: getActionStatus(createTaskData.chipGroup, 'deletable'),
          draggable: getActionStatus(createTaskData.chipGroup, 'draggable'),
          resizable: getActionStatus(createTaskData.chipGroup, 'resizable'),
          split: data.split,
        });
        return true;
      },
    },
  });
};

// カスタムイベントを発行するための関数を定義
const emit = defineEmits(['customTitle', 'customContent']);
// カスタムタイトルを取得する非同期関数
const getCustomTitle = (titleData: string) => {
  return new Promise((resolve) => {
    emit('customTitle', titleData, (result) => {
      resolve(result);
    });
  });
};
// カスタムコンテンツを取得する非同期関数
const getCustomContent = (contentData: string) => {
  return new Promise((resolve) => {
    emit('customContent', contentData, (result) => {
      resolve(result);
    });
  });
};
</script>

<style lang="scss">
$green: #42b983;
$pink: #ff7fc3;
$yellow: rgb(234, 234, 52);

.vuecal--view-with-time .vuecal__weekdays-headings,
.vuecal--view-with-time .vuecal__all-day {
  padding-right: 0px !important;
}
.main-demo {
  font-size: 12px;
  .tagline {
    max-width: 500px;
    margin: 0 auto 5rem;

    .title1 {
      letter-spacing: normal;
    }
  }
}

.demo {
  border-radius: 4px;

  // Date picker.
  &.vuecal--date-picker .vuecal__cell-events-count {
    width: 4px;
    height: 4px;
    min-width: 0;
    padding: 0;
    margin-top: 4px;
    color: transparent;
    background-color: $green;
  }
  &.vuecal--date-picker .vuecal__cell--selected .vuecal__cell-events-count {
    background-color: #fff;
  }

  // Both calendars.
  .vuecal__cell--out-of-scope {
    color: rgba(0, 0, 0, 0.15);
  }

  // Full power calendar.
  // ------------------------------------------------------
  &.full-cal .vuecal__menu {
    background-color: transparent;
  }
  &.full-cal .vuecal__title-bar {
    background: rgba(0, 0, 0, 0.03);
  }
  .vuecal__view-btn {
    background: none;
    padding: 0 10px;
    margin: 4px 2px;
    border-radius: 30px;
    height: 20px;
    line-height: 20px;
    font-size: 13px;
    text-transform: uppercase;
    border: none;
    color: inherit;

    &--active {
      background: rgb(66, 185, 130);
      color: #fff;
    }
  }
  &.full-cal .weekday-label {
    opacity: 0.4;
    font-weight: 500;
  }
  .vuecal__header .v-icon {
    color: inherit;
  }
  &:not(.vuecal--day-view) .vuecal__cell--selected {
    background-color: transparent;
  }
  &:not(.vuecal--day-view).full-cal .vuecal__cell--selected:before {
    border: 1px solid rgba($green, 0.8);
  }

  .vuecal__event-time {
    margin: 3px 0;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.2;
  }

  // green.
  .vuecal__header .green {
    color: darken($green, 5);
  }
  .vuecal__body .green {
    background-color: rgba($green, 0.08);
  }
  .green .vuecal__event {
    background-color: rgba(lighten($green, 5), 0.85);
    color: #fff;
  }
  .green .lunch {
    background: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 10px,
      rgba($green, 0.15) 10px,
      rgba($green, 0.15) 20px
    );
    color: transparentize(darken($green, 10), 0.4);
  }

  // pink.
  .vuecal__header .pink {
    color: darken($pink, 5);
  }
  .vuecal__body .pink {
    background-color: rgba($pink, 0.08);
  }
  .pink .vuecal__event {
    background-color: rgba(lighten($pink, 5), 0.85);
    color: #fff;
  }
  .pink .lunch {
    background: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 10px,
      rgba($pink, 0.15) 10px,
      rgba($pink, 0.15) 20px
    );
    color: transparentize(darken($pink, 10), 0.4);
  }
  // yellow
  .vuecal__header .yellow {
    color: darken($yellow, 5);
  }
  .vuecal__body .yellow {
    background-color: rgba($yellow, 0.08);
  }
  .yellow .vuecal__event {
    background-color: rgba(lighten($yellow, 5), 0.85);
    color: #fff;
  }
  .yellow .lunch {
    background: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 10px,
      rgba($yellow, 0.15) 10px,
      rgba($yellow, 0.15) 20px
    );
    color: transparentize(darken($yellow, 10), 0.4);
  }
  // ------------------------------------------------------
}

.blue-event {
  background-color: #42b983 !important;
}

// Media queries.
// --------------------------------------------------------
@media screen and (max-width: 499px) {
  .main-demo .day-split-header strong {
    display: none;
  }
}
</style>
