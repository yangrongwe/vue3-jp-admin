import type { FormRules } from 'element-plus';
type FormItems = {
  itemName: string;
  itemType: string;
};

type JpFormOptions = {
  type: string;
  formItems: Array<FormItems>;
  rules: Array<FormRules>;
};

export default JpFormOptions;
