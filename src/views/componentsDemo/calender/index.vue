<template>
  <!-- jp-main-area コンポーネントを表示し、高さを最大に設定 -->
  <jp-main-area :h-full="true">
    <div></div>
    <!-- JpCalender コンポーネントを表示 -->
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
import { v4 as uuidv4 } from 'uuid';
import { getWeekDates } from '@/utils/common';

// 一週間の日付リストを取得する関数
const getWeekEventList = () => {
  // 一週間の日付を取得
  let weeks = getWeekDates();
  let eventsList: any[] = [];
  // 各日付に対してイベントを生成して配列に追加
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

// カレンダーの設定オブジェクト
const calenderConfig = {
  editable: {
    title: false,
    drag: true,
    resize: true,
    create: true,
    delete: true,
  },
  events: getWeekEventList(),
  props: {
    // 土曜日と日曜日を非表示にする
    hideWeekends: true,
    // 開始時間
    timeFrom: 8 * 60,
    // 終了時間
    timeTo: 19 * 60,
    // 時間を指定の時間間隔境界に自動的に揃える
    // snapToTime: '0',
    // 日付を分割する（日付の下に複数のラベルを含む）
    splitDays: [
      { label: 'John', class: 'green' },
      { label: 'Keta', class: 'pink' },
    ],
    // 分割ラベルを固定表示する
    stickySplitLabels: true,
    // 最小セル幅
    minCellWidth: 200,
    // 最小分割幅
    minSplitWidth: 170,
  },
};

// カスタムタイトルを処理する関数
const customTitle = (titleData: string, callback) => {
  // タイトルデータを HTML 要素に包んでコールバックを呼び出す
  callback(`<div>${titleData}</div>`);
};
const customContent = (contentData: string, callback) => {
  // コンテンツデータを HTML 要素に包んでコールバックを呼び出す
  callback(`<div>${contentData}</div>`);
};
</script>
