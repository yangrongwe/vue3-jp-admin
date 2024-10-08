import VxeTable from 'vxe-table';

import 'vxe-table/lib/style.css';

import VxeUI from 'vxe-pc-ui';
import 'vxe-pc-ui/lib/style.css';

import zhCN from 'vxe-table/lib/locale/lang/zh-CN';
import enUS from 'vxe-table/lib/locale/lang/en-US';
import jaJP from 'vxe-table/lib/locale/lang/ja-JP';

VxeTable.setConfig({
  table: {},
  grid: {
    pagerConfig: {
      pageSize: 10,
      layouts: ['PrevJump', 'Number', 'NextJump', 'Sizes', 'Total'],
    },
  },
});

const language = localStorage.getItem('app-lang') || 'ja';
switch (language) {
  case 'en':
    VxeTable.setI18n('en-US', enUS);
    VxeTable.setLanguage('en-US');
    break;
  case 'zh':
    VxeTable.setI18n('zh-CN', zhCN);
    VxeTable.setLanguage('zh-CN');
    break;
  case 'ja':
    VxeTable.setI18n('ja-JP', jaJP);
    VxeTable.setLanguage('ja-JP');
    break;
  default:
    VxeTable.setI18n('ja-JP', jaJP);
    VxeTable.setLanguage('ja-JP');
    break;
}

export { VxeTable, VxeUI };
