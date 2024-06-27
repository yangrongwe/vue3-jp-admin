type FormItems = {
  itemName: string;
  itemType: string;
  imagePath?: string;
  labelPosition?: string;
  visible?: boolean;
  appendInnerIcon?: string;
  prependInnerIcon?: string;
  width?: number;
  clickMethod?: () => void;
};

type JpFormOptions = {
  type: string;
  formItems: Array<FormItems>;
  rules: Array<any>;
};

export default JpFormOptions;
