import { reactive, ref } from 'vue';
import {
  VxeUI,
  VxeGridProps,
  VxeGridListeners,
  VxeGridInstance,
} from 'vxe-table';
import { $t } from '@/plugins/i18n/i18nUtils';
interface RowVO {
  id: number;
  name: string;
  nickname: string;
  role: string;
  sex: string;
  age: number;
  address: string;
}

// 日语化的数据
const AllList = [
  {
    id: 10001,
    name: 'テスト1',
    nickname: 'T1',
    role: '開発者',
    sex: '男',
    age: 28,
    address: '深圳',
  },
  {
    id: 10002,
    name: 'テスト2',
    nickname: 'T2',
    role: 'テスト',
    sex: '女',
    age: 22,
    address: '広州',
  },
  {
    id: 10003,
    name: 'テスト3',
    nickname: 'T3',
    role: 'PM',
    sex: '男',
    age: 32,
    address: '上海',
  },
  {
    id: 10004,
    name: 'テスト4',
    nickname: 'T4',
    role: 'デザイナー',
    sex: '女',
    age: 23,
    address: 'テスト abc',
  },
  {
    id: 10005,
    name: 'テスト5',
    nickname: 'T5',
    role: '開発者',
    sex: '女',
    age: 30,
    address: '上海',
  },
  {
    id: 10006,
    name: 'テスト6',
    nickname: 'T6',
    role: 'デザイナー',
    sex: '女',
    age: 21,
    address: '深圳',
  },
  {
    id: 10007,
    name: 'テスト7',
    nickname: 'T7',
    role: 'テスト',
    sex: '男',
    age: 29,
    address: '深圳',
  },
  {
    id: 10008,
    name: 'テスト8',
    nickname: 'T8',
    role: '開発者',
    sex: '男',
    age: 35,
    address: 'テスト abc',
  },
  {
    id: 10009,
    name: 'テスト9',
    nickname: 'T9',
    role: '開発者',
    sex: '男',
    age: 35,
    address: '深圳',
  },
  {
    id: 10010,
    name: 'テスト10',
    nickname: 'T10',
    role: '開発者',
    sex: '男',
    age: 35,
    address: '広州',
  },
  {
    id: 10011,
    name: 'テスト11',
    nickname: 'T11',
    role: '開発者',
    sex: '男',
    age: 49,
    address: '広州',
  },
  {
    id: 10012,
    name: 'テスト12',
    nickname: 'T12',
    role: '開発者',
    sex: '女',
    age: 45,
    address: '上海',
  },
  {
    id: 10013,
    name: 'テスト13',
    nickname: 'T13',
    role: 'テスト',
    sex: '女',
    age: 35,
    address: '広州',
  },
  {
    id: 10014,
    name: 'テスト14',
    nickname: 'T14',
    role: 'テスト',
    sex: '男',
    age: 29,
    address: '上海',
  },
  {
    id: 10015,
    name: 'テスト15',
    nickname: 'T15',
    role: '開発者',
    sex: '男',
    age: 39,
    address: '広州',
  },
  {
    id: 10016,
    name: 'テスト16',
    nickname: 'T16',
    role: 'テスト',
    sex: '女',
    age: 35,
    address: '広州',
  },
  {
    id: 10017,
    name: 'テスト17',
    nickname: 'T17',
    role: 'テスト',
    sex: '男',
    age: 39,
    address: '上海',
  },
  {
    id: 10018,
    name: 'テスト18',
    nickname: 'T18',
    role: '開発者',
    sex: '男',
    age: 44,
    address: '広州',
  },
  {
    id: 10019,
    name: 'テスト19',
    nickname: 'T19',
    role: '開発者',
    sex: '男',
    age: 39,
    address: '広州',
  },
  {
    id: 10020,
    name: 'テスト20',
    nickname: 'T20',
    role: 'テスト',
    sex: '女',
    age: 35,
    address: '広州',
  },
  {
    id: 10021,
    name: 'テスト21',
    nickname: 'T21',
    role: 'テスト',
    sex: '男',
    age: 39,
    address: '上海',
  },
  {
    id: 10022,
    name: 'テスト22',
    nickname: 'T22',
    role: '開発者',
    sex: '男',
    age: 44,
    address: '広州',
  },
];

// 前端分页处理函数
const handlePageData = (pagerConfig: any, gridOptions: any) => {
  gridOptions.loading = true;
  setTimeout(() => {
    const { pageSize, currentPage } = pagerConfig;
    gridOptions.pagerConfig.total = AllList.length;
    gridOptions.data = AllList.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );
    gridOptions.loading = false;
  }, 100);
};

// 基本表格配置
export const basicGridOptions = reactive<VxeGridProps<RowVO>>({
  showOverflow: true,
  border: true,
  height: 500,
  columns: [
    { type: 'seq', width: 70, fixed: 'left' },
    { field: 'name', title: $t('views.table.name'), minWidth: 160 },
    { field: 'nickname', title: $t('views.table.nickname'), minWidth: 160 },
    { field: 'role', title: $t('views.table.role'), minWidth: 160 },
    { field: 'age', title: $t('views.table.age'), width: 100 },
    { field: 'address', title: $t('views.table.address'), minWidth: 160 },
  ],
  data: AllList,
});

// 分页表格配置
export const paginationGridOptions = reactive<
  VxeGridProps<RowVO> & {
    pagerConfig: {
      total: number;
      currentPage: number;
      pageSize: number;
    };
  }
>({
  showOverflow: true,
  border: true,
  height: 500,
  pagerConfig: {
    total: 0,
    currentPage: 1,
    pageSize: 10,
  },
  columns: [
    { type: 'seq', width: 70, fixed: 'left' },
    { field: 'name', title: $t('views.table.name'), minWidth: 160 },
    { field: 'nickname', title: $t('views.table.nickname'), minWidth: 160 },
    { field: 'role', title: $t('views.table.role'), minWidth: 160 },
    { field: 'age', title: $t('views.table.age'), width: 100 },
    { field: 'address', title: $t('views.table.address'), minWidth: 160 },
  ],
  data: [], // Initial empty data
});

// 树形表格配置
export const treeGridOptions = reactive<VxeGridProps>({
  border: true,
  treeConfig: {
    rowField: 'id',
    childrenField: 'children',
  },
  columns: [
    { type: 'seq', width: 70 },
    {
      field: 'name',
      title: $t('views.table.name'),
      minWidth: 300,
      treeNode: true,
    },
    { field: 'size', title: $t('views.table.size') },
    { field: 'type', title: $t('views.table.type') },
    { field: 'date', title: $t('views.table.date') },
  ],
  data: [
    { id: 10000, name: 'テスト1', type: 'mp3', size: 1024, date: '2020-08-01' },
    {
      id: 10050,
      name: 'テスト2',
      type: 'mp4',
      size: 0,
      date: '2021-04-01',
      children: [
        {
          id: 24300,
          name: 'テスト3',
          type: 'avi',
          size: 1024,
          date: '2020-03-01',
          children: [
            {
              id: 20045,
              name: 'テスト4',
              type: 'html',
              size: 600,
              date: '2021-04-01',
            },
            {
              id: 10053,
              name: 'テスト5',
              type: 'avi',
              size: 0,
              date: '2021-04-01',
              children: [
                {
                  id: 24330,
                  name: 'テスト6',
                  type: 'txt',
                  size: 25,
                  date: '2021-10-01',
                },
                {
                  id: 21011,
                  name: 'テスト7',
                  type: 'pdf',
                  size: 512,
                  date: '2020-01-01',
                },
                {
                  id: 22200,
                  name: 'テスト8',
                  type: 'js',
                  size: 1024,
                  date: '2021-06-01',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 23666,
      name: 'テスト9',
      type: 'xlsx',
      size: 2048,
      date: '2020-11-01',
      children: [
        {
          id: 23677,
          name: 'テスト10',
          type: 'js',
          size: 1024,
          date: '2021-06-01',
          children: [
            {
              id: 23671,
              name: 'テスト11',
              type: 'js',
              size: 1024,
              date: '2021-06-01',
            },
            {
              id: 23672,
              name: 'テスト12',
              type: 'js',
              size: 1024,
              date: '2021-06-01',
            },
          ],
        },
        {
          id: 23688,
          name: 'テスト13',
          type: 'js',
          size: 1024,
          date: '2021-06-01',
          children: [
            {
              id: 23681,
              name: 'テスト14',
              type: 'js',
              size: 1024,
              date: '2021-06-01',
            },
            {
              id: 23682,
              name: 'テスト15',
              type: 'js',
              size: 1024,
              date: '2021-06-01',
            },
          ],
        },
      ],
    },
    {
      id: 24555,
      name: 'テスト16',
      type: 'avi',
      size: 224,
      date: '2020-10-01',
      children: [
        {
          id: 24566,
          name: 'テスト17',
          type: 'js',
          size: 1024,
          date: '2021-06-01',
        },
        {
          id: 24577,
          name: 'テスト18',
          type: 'js',
          size: 1024,
          date: '2021-06-01',
        },
      ],
    },
  ],
});

// 可编辑表格配置
export const editableGridOptions = reactive<VxeGridProps<RowVO>>({
  showOverflow: true,
  border: true,
  height: 500,
  editConfig: {
    trigger: 'click',
    mode: 'cell',
  },
  columns: [
    { type: 'seq', width: 70, fixed: 'left' },
    {
      field: 'name',
      title: $t('views.table.name'),
      minWidth: 160,
      editRender: { name: 'input' },
    },
    {
      field: 'nickname',
      title: $t('views.table.nickname'),
      minWidth: 160,
      editRender: { name: 'input' },
    },
    {
      field: 'role',
      title: $t('views.table.role'),
      minWidth: 160,
      editRender: { name: 'input' },
    },
    {
      field: 'age',
      title: $t('views.table.age'),
      width: 100,
      editRender: { name: 'input' },
    },
    {
      field: 'address',
      title: $t('views.table.address'),
      minWidth: 160,
      editRender: { name: 'input' },
    },
  ],
  data: AllList,
});

// 分组表头与固定列
export const customColumnGridOptions = reactive<VxeGridProps<RowVO>>({
  border: true,
  keepSource: true,
  showOverflow: true,
  id: 'toolbar_demo_1',
  height: 500,
  printConfig: {},
  importConfig: {},
  exportConfig: {},
  columnConfig: {
    resizable: true,
  },
  customConfig: {
    storage: true,
  },
  columns: [
    { type: 'checkbox', width: 50, fixed: 'left' },
    { type: 'seq', width: 70, fixed: 'left' },
    { field: 'name', title: $t('views.table.name'), width: 600 }, // Name -> 名前
    {
      title: $t('views.table.category'), // Category -> カテゴリ
      children: [
        { field: 'nickname', title: $t('views.table.nickname'), width: 400 }, // Nickname -> ニックネーム
        { field: 'role', title: $t('views.table.role'), width: 400 }, // Role -> 役割
      ],
    },
    {
      field: 'address',
      title: $t('views.table.address'),
      minWidth: 300,
      fixed: 'right',
    }, // Address -> 住所
  ],
  toolbarConfig: {
    custom: true,
  },
  data: [
    {
      id: 10001,
      name: 'テスト1',
      nickname: 'T1',
      role: '開発者',
      sex: '男性',
      age: 28,
      address: '深圳',
    },
    {
      id: 10002,
      name: 'テスト2',
      nickname: 'T2',
      role: 'テスト',
      sex: '女性',
      age: 22,
      address: '広州',
    },
    {
      id: 10003,
      name: 'テスト3',
      nickname: 'T3',
      role: 'PM',
      sex: '男性',
      age: 32,
      address: '上海',
    },
    {
      id: 10004,
      name: 'テスト4',
      nickname: 'T4',
      role: 'デザイナー',
      sex: '女性',
      age: 23,
      address: '深圳',
    },
    {
      id: 10005,
      name: 'テスト5',
      nickname: 'T5',
      role: '開発者',
      sex: '女性',
      age: 30,
      address: '上海',
    },
    {
      id: 10006,
      name: 'テスト6',
      nickname: 'T6',
      role: 'デザイナー',
      sex: '女性',
      age: 21,
      address: '深圳',
    },
    {
      id: 10007,
      name: 'テスト7',
      nickname: 'T7',
      role: 'テスト',
      sex: '男性',
      age: 29,
      address: '深圳',
    },
    {
      id: 10008,
      name: 'テスト8',
      nickname: 'T8',
      role: '開発者',
      sex: '男性',
      age: 35,
      address: '深圳',
    },
  ],
});

// 合并单元格表格配置
export const mergeCellGridOptions = reactive<VxeGridProps>({
  border: true,
  mergeCells: [
    { row: 0, col: 3, rowspan: 2, colspan: 2 }, // Merge cells configuration
    { row: 1, col: 1, rowspan: 3, colspan: 2 },
  ],
  columns: [
    { type: 'seq', width: 70, title: $t('views.table.number') }, // Seq -> 番号
    { field: 'name', title: $t('views.table.name') }, // Name -> 名前
    { field: 'sex', title: $t('views.table.sex') }, // Sex -> 性別
    { field: 'age', title: $t('views.table.age') }, // Age -> 年齢
    { field: 'address', title: $t('views.table.address'), showOverflow: true }, // Address -> 住所
  ],
  data: [
    {
      id: 10001,
      name: 'テスト1',
      role: '開発者',
      sex: '男性',
      age: 28,
      address: 'テスト ABC',
    },
    {
      id: 10002,
      name: 'テスト2',
      role: 'テスト',
      sex: '女性',
      age: 22,
      address: '広州',
    },
    {
      id: 10003,
      name: 'テスト3',
      role: 'PM',
      sex: '男性',
      age: 32,
      address: '上海',
    },
    {
      id: 10004,
      name: 'テスト4',
      role: 'デザイナー',
      sex: '女性',
      age: 24,
      address: '上海',
    },
  ],
});

// 右键菜单表格
export const rightClickGridRef = ref<VxeGridInstance<RowVO>>();
export const rightClickGridOptions = reactive<VxeGridProps<RowVO>>({
  border: true,
  showFooter: true,
  rowConfig: {
    isCurrent: true,
  },
  columnConfig: {
    resizable: true,
  },
  columns: [
    { field: 'checkbox', type: 'checkbox', width: 50 },
    { type: 'seq', width: 70 },
    { field: 'name', title: $t('views.table.name') },
    { field: 'nickname', title: $t('views.table.nickname') },
    { field: 'age', title: $t('views.table.age') },
    { field: 'role', title: $t('views.table.role') },
    { field: 'address', title: $t('views.table.address'), showOverflow: true },
  ],
  data: [
    {
      id: 10001,
      name: 'テスト1',
      nickname: 'T1',
      role: '開発者',
      sex: '男性',
      age: 28,
      address: '深圳',
    },
    {
      id: 10002,
      name: 'テスト2',
      nickname: 'T2',
      role: 'テスター',
      sex: '女性',
      age: 22,
      address: '広州',
    },
    {
      id: 10003,
      name: 'テスト3',
      nickname: 'T3',
      role: 'PM',
      sex: '男性',
      age: 32,
      address: '上海',
    },
    {
      id: 10004,
      name: 'テスト4',
      nickname: 'T4',
      role: 'デザイナー',
      sex: '女性',
      age: 23,
      address: '深圳',
    },
    {
      id: 10005,
      name: 'テスト5',
      nickname: 'T5',
      role: '開発者',
      sex: '女性',
      age: 30,
      address: '上海',
    },
  ],
  menuConfig: {
    header: {
      options: [
        [
          {
            code: 'exportAll',
            name: '全てをエクスポート.csv',
            prefixIcon: 'vxe-icon-download',
            visible: true,
            disabled: false,
          },
        ],
      ],
    },
    body: {
      options: [
        [
          {
            code: 'copy',
            name: '内容をコピー',
            prefixIcon: 'vxe-icon-copy',
            visible: true,
            disabled: false,
          },
          {
            code: 'clear',
            name: '内容をクリア',
            visible: true,
            disabled: false,
          },
          {
            code: 'reload',
            name: 'テーブルを更新',
            visible: true,
            disabled: false,
          },
        ],
        [
          {
            code: 'myPrint',
            name: '印刷',
            prefixIcon: 'vxe-icon-print',
            visible: true,
            disabled: false,
          },
          {
            code: 'myExport',
            name: 'エクスポート.csv',
            prefixIcon: 'vxe-icon-download',
            visible: true,
            disabled: false,
          },
        ],
      ],
    },
    footer: {
      options: [
        [
          {
            code: 'exportAll',
            name: '全てをエクスポート.csv',
            prefixIcon: 'vxe-icon-download',
            visible: true,
            disabled: false,
          },
        ],
      ],
    },
  },
  footerData: [{ checkbox: '合計', age: 135 }],
});

// 数据导出
// グリッドの参照
export const exportGridRef = ref<VxeGridInstance<RowVO>>();

// グリッドオプションの設定
export const exportGridOptions = reactive<VxeGridProps>({
  columns: [
    { type: 'seq', width: 70, title: $t('views.table.number') },
    { field: 'name', title: $t('views.table.name') },
    { field: 'sex', title: $t('views.table.sex') },
    { field: 'age', title: $t('views.table.age') },
  ],
  data: [
    {
      id: 10001,
      name: 'テスト1',
      role: '開発者',
      sex: '男性',
      age: 28,
      address: 'テスト abc',
    },
    {
      id: 10002,
      name: 'テスト2',
      role: 'テスター',
      sex: '女性',
      age: 22,
      address: '広州',
    },
    {
      id: 10003,
      name: 'テスト3',
      role: 'PM',
      sex: '男性',
      age: 32,
      address: '上海',
    },
    {
      id: 10004,
      name: 'テスト4',
      role: 'デザイナー',
      sex: '女性',
      age: 24,
      address: '上海',
    },
  ],
});

// エクスポートイベントの設定
export const exportEvent = (exportType: string = 'txt') => {
  const $grid = exportGridRef.value;
  if ($grid) {
    $grid.exportData({
      type: exportType,
    });
  }
};

// 表格事件处理函数
export const gridEvents: VxeGridListeners = {
  pageChange({ pageSize, currentPage }) {
    paginationGridOptions.pagerConfig.currentPage = currentPage;
    paginationGridOptions.pagerConfig.pageSize = pageSize;
    handlePageData(paginationGridOptions.pagerConfig, paginationGridOptions);
  },
  cellMenu({ row }) {
    const $grid = rightClickGridRef.value;
    if ($grid) {
      $grid.setCurrentRow(row);
    }
  },
  menuClick({ menu, row, column }) {
    const $grid = rightClickGridRef.value;
    if ($grid) {
      switch (menu.code) {
        case 'copy':
          if (row && column) {
            if (VxeUI.clipboard.copy(row[column.field])) {
              VxeUI.modal.message({
                content: 'クリップボードにコピーされました！',
                status: 'success',
              });
            }
          }
          break;
        case 'clear':
          console.log('clear');
          $grid.clearData(row, column.field);
          break;
        case 'myPrint':
          $grid.print();
          break;
        case 'myExport':
          $grid.exportData();
          break;
      }
    }
  },
};

// 初始化分页数据
handlePageData(paginationGridOptions.pagerConfig, paginationGridOptions);
