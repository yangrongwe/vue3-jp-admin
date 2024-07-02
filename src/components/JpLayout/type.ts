type menu = {
  name: string;
  icon: string;
  route?: string;
  expanded?: boolean;
  children?: Array<subMenu>;
};

type subMenu = {
  title: string;
  icon: string;
  name: string;
  unShow?:boolean;
};

export type { menu, subMenu };
