export interface JpFormOptions {
  formItems: Array<{
    itemName?: string;

    itemType: string;
    itemSubType?: string;

    label?: string;
    labelWidth?: string;
    labelPosition?: string;
    props?: Record<string, any>; // Component props
    eventHandlers?: Record<string, Function>; // Event handlers
  }>;
  rules: Record<string, any>;
}
