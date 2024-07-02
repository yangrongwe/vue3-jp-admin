import apiService from '@/utils/api';

const userLogin = (data) => {
  return apiService.post('mock/userLogin', data);
};

export { userLogin };
