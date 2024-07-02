import { MockMethod, MockConfig } from 'vite-plugin-mock'

export default [
  {
    url: '/mock/userLogin',
    method: 'post',
    response: () => {
      return {
        data: {
          name: 'John Doe',
          age: 25,
        },
        errorCode:null,
        errorMessage:'账户不存在'

      };
    },
  },
] as MockMethod[];
