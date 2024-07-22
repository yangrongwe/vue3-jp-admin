type User = {
  userId: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
};

type AlertProps = {
  show: boolean;
};

type MainTitle = {
  title: string;
  linkText: string;
  path: string;
};

export type { User, AlertProps, MainTitle };
