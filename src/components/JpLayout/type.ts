type menu = {
  title: string;
  icon: string;
  route: string;
  children?: Array<subMenu>;
};

type subMenu = {
  title: string;
  icon: string;
  route: string;
};

export default menu;
