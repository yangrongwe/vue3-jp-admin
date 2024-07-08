<<<<<<< HEAD
import { MockMethod } from 'vite-plugin-mock';

export default [
  {
    url: '/api/user',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: {
          name: 'John Doe',
          age: 25,
        },
=======
import { MockMethod, MockConfig } from 'vite-plugin-mock'

export default [
  {
    url: '/mock/userLogin',
    method: 'post',
    response: () => {
      return {
      
          user:{
            name: 'John Doe',
            age: 25,
            role:'admin'
          },
        
      
        errorCode:null,
        errorMessage:'账户不存在'

>>>>>>> jp_dev
      };
    },
  },
] as MockMethod[];
