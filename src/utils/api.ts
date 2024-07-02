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
        // 处理请求错误
        return Promise.reject(error);
      }
    );

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
        return Promise.reject(error);
      }
    );
  }

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
    }
  }

  // POST 请求方法
  public async post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.post<T>(url, data, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // PUT 请求方法
  public async put<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.put<T>(url, data, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // DELETE 请求方法
  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.delete<T>(url, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // 处理错误方法
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
  }
}

// 创建一个单例对象，以便在整个应用程序中共享同一个实例
const baseURL = ''; // 请根据实际情况设置 baseURL
const apiService = new ApiService(baseURL);

export default apiService;