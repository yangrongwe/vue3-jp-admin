type menu = {
  title: string;
  icon: string;
  route?: string;
  expanded?: boolean;
  children?: Array<subMenu>;
};

type subMenu = {
  title: string;
  icon: string;
  route: string;
};

export type { menu, subMenu };
