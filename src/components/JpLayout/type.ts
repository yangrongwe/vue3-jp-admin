type Menu = {
  name: string;
  path?: string;
  expanded?: boolean;
  meta?: RouteMeta;
  children?: Array<SubMenu>;
};

type SubMenu = {
  title: string;
  name: string;
  path: string;
  meta?: RouteMeta;
};

type RouteMeta = {
  icon?: string;
  unShow?: boolean;
  roles?: Array<string>;
  rank?: number;
};

export type { Menu, SubMenu, RouteMeta };
