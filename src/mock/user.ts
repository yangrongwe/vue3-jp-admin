import { MockMethod, MockConfig } from 'vite-plugin-mock';

export default [
  {
    url: '/mock/userLogin',
    method: 'post',
    response: () => {
      return {
        user: {
          userId: '1001',
          name: '田中　太郎',
          email: 'taro@wxcorer.com',
          avatar: 'https://randomuser.me/api/portraits/women/85.jpg',
          role: 'admin',
        },
        errorCode: null,
        errorMessage: '账户不存在',
      };
    },
  },
] as MockMethod[];
