type menu = {
  name: string;

  path?: string;
  expanded?: boolean;
  meta?:routeMeta,
  children?: Array<subMenu>;
};

type subMenu = {
  title: string;

  name: string;
  path: string;
  meta?:routeMeta,
};

type routeMeta = {
  icon?: string;
  unShow?:boolean;
  roles?:Array<string>;
  rank?:number;
}

export type { menu, subMenu,routeMeta };
