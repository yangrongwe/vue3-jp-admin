export interface JpFormOptions {
  type: string;
  formItems: Array<{
    itemType: string;
    itemSubType?: string;
    itemName?: string;
    labelPosition?: string;
    prependInnerIcon?: string;
    appendInnerIcon?: string;
    visible?: boolean;
    modelValue?: any;
    placeholder?: string;
    label?: string;
    items?: Array<any>;
    min?: number;
    max?: number;
    options?: Array<{ label: string; value: any }>;
    clickMethod?: () => void;
    props?: Record<string, any>; // Component props
    eventHandlers?: Record<string, Function>; // Event handlers
  }>;
  rules: Record<string, any>;
}
