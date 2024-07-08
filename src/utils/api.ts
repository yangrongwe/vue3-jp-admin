<<<<<<< HEAD
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
=======
import axios, { AxiosInstance, AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  // 配置拦截器
  private setupInterceptors() {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // 在发送请求之前做些什么，例如加入 token
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: AxiosError) => {
>>>>>>> jp_dev
        // 处理请求错误
        return Promise.reject(error);
      }
    );

<<<<<<< HEAD
    // 添加响应拦截器
    axios.interceptors.response.use(
      (response) => {
        // 处理响应数据，根据实际需求进行处理
        return response.data;
      },
      (error: AxiosError) => {
        // 处理响应错误
=======
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        // 检查响应数据
        if (response.data && response.data.errorCode) {
          // 假设业务错误信息包含在 response.data.errorCode 和 response.data.errorMessage 中
          const businessError = {
            code: response.data.errorCode,
            message: response.data.errorMessage,
          };
          return Promise.reject(businessError);
        }
        return response; // 确保返回完整的响应对象
      },
      (error: AxiosError) => {
        // 处理响应错误
        this.handleError(error);
>>>>>>> jp_dev
        return Promise.reject(error);
      }
    );
  }

<<<<<<< HEAD
  // GET 请求方法
  public async get<T>(url: string, params?: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.get<T>(url, { params });
      return response.data; // 返回响应数据部分
    } catch (error) {
      this.handleError(error);
      throw new Error(`GET ${url} 失败: ${error}`);
=======
  // 获取 Token 方法（假设 token 保存在 localStorage 中）
  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  // GET 请求方法
  public async get<T>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.get<T>(url, { params, ...config });
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
>>>>>>> jp_dev
    }
  }

  // POST 请求方法
<<<<<<< HEAD
  public async post<T>(url: string, data: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.post<T>(url, data);
      return response.data; // 返回响应数据部分
    } catch (error) {
      this.handleError(error);
      throw new Error(`POST ${url} 失败: ${error}`);
=======
  public async post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.post<T>(url, data, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
>>>>>>> jp_dev
    }
  }

  // PUT 请求方法
<<<<<<< HEAD
  public async put<T>(url: string, data: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.put<T>(url, data);
      return response.data; // 返回响应数据部分
    } catch (error) {
      this.handleError(error);
      throw new Error(`PUT ${url} 失败: ${error}`);
=======
  public async put<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.put<T>(url, data, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
>>>>>>> jp_dev
    }
  }

  // DELETE 请求方法
<<<<<<< HEAD
  public async delete<T>(url: string): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.delete<T>(url);
      return response.data; // 返回响应数据部分
    } catch (error) {
      this.handleError(error);
      throw new Error(`DELETE ${url} 失败: ${error}`);
=======
  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.delete<T>(url, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
>>>>>>> jp_dev
    }
  }

  // 处理错误方法
<<<<<<< HEAD
  private handleError(error: AxiosError): void {
    // 根据需要处理错误，例如记录日志或显示用户提示
    console.error('请求错误:', error.message);
=======
  private handleError(error: AxiosError | any): void {
    if (axios.isAxiosError(error)) {
      console.error('请求错误:', error.message);
      if (error.response) {
        console.error('状态码:', error.response.status);
        console.error('响应数据:', error.response.data);
      }
    } else if (error && error.code && error.message) {
      // 处理业务错误
      console.error('业务错误代码:', error.code);
      console.error('业务错误信息:', error.message);
      alert(`错误代码: ${error.code}, 错误信息: ${error.message}`);
    } else {
      console.error('未知错误:', error);
    }
>>>>>>> jp_dev
  }
}

// 创建一个单例对象，以便在整个应用程序中共享同一个实例
<<<<<<< HEAD
const baseURL = 'https://api.example.com/';
const apiService = new ApiService(baseURL);

export default apiService;
=======
const baseURL = ''; // 请根据实际情况设置 baseURL
const apiService = new ApiService(baseURL);

export default apiService;
>>>>>>> jp_dev
