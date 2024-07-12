import { ref, reactive } from 'vue';
const chartRadaOptions = ref({
  title: {},
  legend: {
    data: ['Allocated Budget', 'Actual Spending'],
  },
  radar: {
    // shape: 'circle',
    indicator: [
      { name: 'Sales', max: 6500 },
      { name: 'Administration', max: 16000 },
      { name: 'Information Technology', max: 30000 },
      { name: 'Customer Support', max: 38000 },
      { name: 'Development', max: 52000 },
      { name: 'Marketing', max: 25000 },
    ],
    alignTicks: false,
  },
  series: [
    {
      name: 'Budget vs spending',
      type: 'radar',
      data: [
        {
          value: [4200, 3000, 20000, 35000, 50000, 18000],
          name: 'Allocated Budget',
        },
        {
          value: [5000, 14000, 28000, 26000, 42000, 21000],
          name: 'Actual Spending',
        },
      ],
    },
  ],
});
const chartOptions = ref({
  tooltip: {
    trigger: 'item',
  },
  legend: {
    top: '5%',
    left: 'center',
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      padAngle: 5,
      itemStyle: {
        borderRadius: 10,
      },
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' },
      ],
    },
  ],
});
const lights = () => {
  alert('Toggling lights...');
};

const messages = [
  {
    avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
    name: 'John Leider',
    title: 'Welcome to Vuetify!',
    excerpt: 'Thank you for joining our community...',
  },
  {
    color: 'red',
    icon: 'mdi-account-multiple',
    name: 'Social',
    new: 1,
    total: 3,
    title: 'Twitter',
  },
  {
    color: 'teal',
    icon: 'mdi-tag',
    name: 'Promos',
    new: 2,
    total: 4,
    title: 'Shop your way',
    exceprt: 'New deals available, Join Today',
  },
];
import { VxeUI, VxeGridProps } from 'vxe-table';

interface RowVO {
  id: number;
  name: string;
  role: string;
  sex: string;
  age: number;
  num: number;
  address: string;
}

const sexOptions = ref([
  { label: '男', value: '1' },
  { label: '女', value: '0' },
]);

const formatSex = (row: RowVO) => {
  return row.sex === '1' ? '男' : '女';
};

const gridOptions = reactive<VxeGridProps<RowVO>>({
  maxHeight: 300,
  border: true,
  editConfig: {
    mode: 'cell',
    trigger: 'click',
  },
  columns: [
    { type: 'checkbox', width: 60 },
    { field: 'name', title: 'Name' },
    {
      field: 'sex',
      title: 'Sex',
      editRender: {},
      slots: {
        edit({ row }) {
          return (
            <vxe-select
              v-model={row.sex}
              options={sexOptions.value}
            ></vxe-select>
          );
        },
        default({ row }) {
          return <span>{formatSex(row)}</span>;
        },
      },
    },
    {
      field: 'num',
      title: 'Number',

      editRender: {},
      slots: {
        edit({ row }) {
          return <vxe-input v-model={row.num}></vxe-input>;
        },
      },
    },
    { field: 'age', title: 'Age' },
    { field: 'address', title: 'Address' },
  ],
  data: [
    {
      id: 10001,
      name: 'Test1',
      role: 'Develop',
      sex: '0',
      age: 28,
      num: 234,
      address: 'test abc',
    },
    {
      id: 10002,
      name: 'Test2',
      role: 'Test',
      sex: '1',
      age: 22,
      num: 34,
      address: 'Guangzhou',
    },
    {
      id: 10003,
      name: 'Test3',
      role: 'PM',
      sex: '0',
      age: 32,
      num: 12,
      address: 'Shanghai',
    },
    {
      id: 10004,
      name: 'Test4',
      role: 'Test',
      sex: '1',
      age: 22,
      num: 34,
      address: 'Guangzhou',
    },
    {
      id: 10005,
      name: 'Test5',
      role: 'PM',
      sex: '0',
      age: 32,
      num: 12,
      address: 'Shanghai',
    },
    {
      id: 10006,
      name: 'Test6',
      role: 'Test',
      sex: '1',
      age: 22,
      num: 34,
      address: 'Guangzhou',
    },
    {
      id: 10007,
      name: 'Test7',
      role: 'PM',
      sex: '0',
      age: 32,
      num: 12,
      address: 'Shanghai',
    },
  ],
});
const lorem =
  'Lorem ipsum dolor sit amet, at aliquam vivendum vel, everti delicatissimi cu eos. Dico iuvaret debitis mel an, et cum zril menandri. Eum in consul legimus accusam. Ea dico abhorreant duo, quo illum minimum incorrupte no, nostro voluptaria sea eu. Suas eligendi ius at, at nemore equidem est. Sed in error hendrerit, in consul constituam cum.';
export { gridOptions, chartRadaOptions, chartOptions, messages, lorem, lights };
