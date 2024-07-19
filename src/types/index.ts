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

export type { User, AlertProps };
