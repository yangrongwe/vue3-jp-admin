<template>
  <jp-main-area :h-full="true">
    <div></div>
    <JpCalender
      @customTitle="customTitle"
      @customContent="customContent"
      :calenderConfig="calenderConfig"
    ></JpCalender>
  </jp-main-area>
</template>

<script setup lang="tsx">
import JpMainArea from '@/components/JpLayout/layout/JpMainArea.vue';
import JpCalender from '@/components/JpCalender/index.vue';
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { getWeekDates } from '@/utils/common';

const getWeekEventList = () => {
  let weeks = getWeekDates();
  let eventsList: any[] = [];
  weeks.map((item) => {
    eventsList.push(
      {
        id: uuidv4(),
        start: `${item} 12:00`,
        end: `${item}  13:00`,
        title: 'LUNCH',
        class: 'lunch',
        background: true,
        deletable: false,
        resizable: false,
        split: 1,
      },
      {
        id: uuidv4(),
        start: `${item} 12:00`,
        end: `${item}  13:00`,
        title: 'LUNCH',
        class: 'lunch',
        background: true,
        deletable: false,
        resizable: false,
        split: 2,
      }
    );
  });
  return eventsList;
};

const calenderConfig = {
  splits: [
    { label: 'John', class: 'green' },
    { label: 'Kate', class: 'pink' },
    // { label: 'John' },
    // { label: 'Kate' },
  ],
  editable: {
    title: false,
    drag: true,
    resize: true,
    create: true,
    delete: true,
  },
  events: getWeekEventList(),
};

const customTitle = (titleData: string, callback) => {
  callback(`<div>${titleData}</div>`);
};
const customContent = (contentData: string, callback) => {
  callback(`<div>${contentData}</div>`);
};
</script>
