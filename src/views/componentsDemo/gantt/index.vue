<template>
  <jp-main-area :h-full="true">
    <div class="main-demo">
      <div
        class="tw-flex tw-flex-wrap tw-items-center tw-justify-center tw-gap-4"
      >
        <div class="tw-h-[210px] tw-w-[220px]">
          <!-- Date picker -->
          <vue-cal
            class="vuecal--blue-theme vuecal--date-picker demo"
            xsmall
            :selected-date="selectedDate"
            hide-view-selector
            :time="false"
            :transitions="false"
            active-view="month"
            :events="demoExample.events"
            :disable-views="['week', 'day']"
            @cell-click="handleDateClick"
          />
        </div>

        <div class="tw-flex-1">
          <!-- Full-power calendar -->
          <vue-cal
            class="demo tw-min-h-[500px]"
            hide-weekends
            :selected-date="selectedDate"
            :time-from="8 * 60"
            :time-to="19 * 60"
            :snap-to-time="0"
            :split-days="demoExample.splits"
            sticky-split-labels
            :editable-events="demoExample.editable"
            :events="demoExample.events"
            @event-click="handleEventClick"
            @event-drag-create="handleEventCreate"
          >
            <template #split-label="{ split, view }">
              <v-icon :color="split.color" size="20">person</v-icon>
              <strong :style="`color: ${split.color}`">{{
                split.label
              }}</strong>
            </template>
          </vue-cal>
        </div>
      </div>
    </div>
  </jp-main-area>
</template>

<script setup lang="tsx">
import { ref, reactive, nextTick } from 'vue';
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';
import JpMainArea from '@/components/JpLayout/layout/JpMainArea.vue';
import { openModal } from '@/utils/modalUtils';
import { $t } from '@/plugins/i18n/i18nUtils';
import JpForm from '@/components/JpForm/index.vue';
import { JpFormOptions } from '@/components/JpForm/type.ts';

const demoExample = ref({
  splits: [
    { label: 'John', class: 'john' },
    { label: 'Kate', class: 'kate' },
  ],
  editable: {
    title: false,
    drag: true,
    resize: true,
    create: true,
    delete: true,
  },
  events: [],
});

const selectedDate = ref(new Date());

// Handle date click
function handleDateClick(date) {
  selectedDate.value = date;
}

const formRef = ref(null);
const formOptions = reactive<JpFormOptions>({
  formItems: [
    {
      itemType: 'input',
      itemName: 'title',
      props: {
        type: 'text',
        label: '标题',
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
      itemType: 'textarea',
      itemName: 'context',
      props: {
        label: 'task内容',
        validateOn: 'blur',
      },
    },
  ],
  rules: {},
});

// calendarDateClick
const handleEventClick = (obj) => {
  console.log('obj', obj);
};

const handleEventCreate = (event) => {
  // 处理事件创建逻辑
  console.log('drag Info', event);
  openModal({
    component: () => <JpForm ref={formRef} form-options={formOptions}></JpForm>,
    props: {
      title: '新建task',
      width: '500',
    },
    callbackMethod: {
      //    console.log(formRef.value.formData);
      onCloseCallback: () => {
        return true;
      },
      onConfirmCallback: () => {
        console.log('formRef.value', formRef.value);
        return false;
      },
    },
  });

  return event;
};

// Setup initial events
function setupEvents() {
  const previousFirstDayOfWeek = new Date(
    new Date().setDate(new Date().getDate() - ((new Date().getDay() + 6) % 7))
  );

  for (let i = 0; i < 5; i++) {
    const day = new Date(previousFirstDayOfWeek);
    day.setDate(day.getDate() + i);
    const dayStr = `${day.getFullYear()}-${('0' + (day.getMonth() + 1)).slice(-2)}-${('0' + day.getDate()).slice(-2)}`;

    demoExample.value.events.push(
      {
        start: `${dayStr} 12:00`,
        end: `${dayStr} 13:00`,
        title: 'LUNCH',
        class: 'lunch',
        background: true,
        deletable: false,
        resizable: false,
        split: 1,
      },
      {
        start: `${dayStr} 12:00`,
        end: `${dayStr} 13:00`,
        title: 'LUNCH',
        class: 'lunch',
        background: true,
        deletable: false,
        resizable: false,
        split: 2,
      }
    );
  }

  const monday = previousFirstDayOfWeek.toISOString().split('T')[0];
  const tuesday = new Date(previousFirstDayOfWeek);
  tuesday.setDate(tuesday.getDate() + 1);
  const tuesdayStr = tuesday.toISOString().split('T')[0];
  const thursday = new Date(previousFirstDayOfWeek);
  thursday.setDate(thursday.getDate() + 3);
  const thursdayStr = thursday.toISOString().split('T')[0];
  const friday = new Date(previousFirstDayOfWeek);
  friday.setDate(friday.getDate() + 4);
  const fridayStr = friday.toISOString().split('T')[0];

  demoExample.value.events.push(
    {
      start: `${monday} 15:30`,
      end: `${monday} 17:30`,
      title: 'Tennis',
      content: '<i class="v-icon material-icons mt1">sports_tennis</i>',
      resizable: false,
      split: 1,
    },
    {
      start: `${monday} 15:30`,
      end: `${monday} 17:30`,
      title: 'Tennis',
      content: '<i class="v-icon material-icons mt1">sports_tennis</i>',
      resizable: false,
      split: 2,
    },
    {
      start: `${tuesdayStr} 08:00`,
      end: `${tuesdayStr} 10:00`,
      title: 'Volleyball',
      content: '<i class="v-icon material-icons mt1">sports_volleyball</i>',
      resizable: false,
      split: 2,
    },
    {
      start: `${thursdayStr} 09:00`,
      end: `${thursdayStr} 11:30`,
      title: 'Golf',
      content: '<i class="v-icon material-icons mt2">golf_course</i>',
      resizable: false,
      split: 1,
    },
    {
      start: `${fridayStr} 16:45`,
      end: `${fridayStr} 18:45`,
      title: 'Movie',
      content: '<i class="v-icon material-icons mt1">local_play</i>',
      resizable: false,
      split: 2,
    }
  );
}

// Setup events on component mount
setupEvents();
</script>

<style lang="scss">
$john: #42b983;
$kate: #ff7fc3;

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
    background-color: $john;
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
    border: 1px solid rgba($john, 0.8);
  }

  .vuecal__event-time {
    margin: 3px 0;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.2;
  }

  // John.
  .vuecal__header .john {
    color: darken($john, 5);
  }
  .vuecal__body .john {
    background-color: rgba($john, 0.08);
  }
  .john .vuecal__event {
    background-color: rgba(lighten($john, 5), 0.85);
    color: #fff;
  }
  .john .lunch {
    background: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 10px,
      rgba($john, 0.15) 10px,
      rgba($john, 0.15) 20px
    );
    color: transparentize(darken($john, 10), 0.4);
  }

  // Kate.
  .vuecal__header .kate {
    color: darken($kate, 5);
  }
  .vuecal__body .kate {
    background-color: rgba($kate, 0.08);
  }
  .kate .vuecal__event {
    background-color: rgba(lighten($kate, 5), 0.85);
    color: #fff;
  }
  .kate .lunch {
    background: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 10px,
      rgba($kate, 0.15) 10px,
      rgba($kate, 0.15) 20px
    );
    color: transparentize(darken($kate, 10), 0.4);
  }
  // ------------------------------------------------------
}

// Media queries.
// --------------------------------------------------------
@media screen and (max-width: 499px) {
  .main-demo .day-split-header strong {
    display: none;
  }
}
</style>
