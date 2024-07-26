// import { VNode } from 'vue';
export interface JpFormOptions {
  formItems: Array<{
    itemType: string;
    itemName?: string;
    itemSubType?: string;

    label?: string;
    labelWidth?: string;
    labelPosition?: string;
    props?: Record<string, any>; // Component props
    eventHandlers?: Record<string, Function>; // Event handlers
    // customContent?: VNode | JSX.Element;
  }>;
  rules: Record<string, any>;
}
