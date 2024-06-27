import axios, { AxiosResponse, AxiosError } from 'axios';

class ApiService {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    axios.defaults.baseURL = baseURL;
    axios.defaults.headers.common['Content-Type'] = 'application/json';

    // 添加请求拦截器
    axios.interceptors.request.use(
      (config) => {
        // 在发送请求之前做些什么，例如加入token
        // config.headers.Authorization = `Bearer ${getToken()}`;
        return config;
      },
      (error) => {
        // 处理请求错误
        return Promise.reject(error);
      }
    );

    // 添加响应拦截器
    axios.interceptors.response.use(
      (response) => {
        // 处理响应数据，根据实际需求进行处理
        return response.data;
      },
      (error: AxiosError) => {
        // 处理响应错误
        return Promise.reject(error);
      }
    );
  }

  // GET 请求方法
  public async get<T>(url: string, params?: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.get<T>(url, { params });
      return response.data; // 返回响应数据部分
    } catch (error) {
      this.handleError(error);
      throw new Error(`GET ${url} 失败: ${error}`);
    }
  }

  // POST 请求方法
  public async post<T>(url: string, data: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.post<T>(url, data);
      return response.data; // 返回响应数据部分
    } catch (error) {
      this.handleError(error);
      throw new Error(`POST ${url} 失败: ${error}`);
    }
  }

  // PUT 请求方法
  public async put<T>(url: string, data: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.put<T>(url, data);
      return response.data; // 返回响应数据部分
    } catch (error) {
      this.handleError(error);
      throw new Error(`PUT ${url} 失败: ${error}`);
    }
  }

  // DELETE 请求方法
  public async delete<T>(url: string): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.delete<T>(url);
      return response.data; // 返回响应数据部分
    } catch (error) {
      this.handleError(error);
      throw new Error(`DELETE ${url} 失败: ${error}`);
    }
  }

  // 处理错误方法
  private handleError(error: AxiosError): void {
    // 根据需要处理错误，例如记录日志或显示用户提示
    console.error('请求错误:', error.message);
  }
}

// 创建一个单例对象，以便在整个应用程序中共享同一个实例
const baseURL = 'https://api.example.com/';
const apiService = new ApiService(baseURL);

export default apiService;
