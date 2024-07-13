import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig,
} from 'axios';

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

  // インターセプターを設定する
  private setupInterceptors() {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // リクエストを送信する前に、トークンなどを追加する
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: AxiosError) => {
        // リクエストエラーを処理する
        return Promise.reject(error);
      }
    );

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        // レスポンスデータをチェックする
        if (response.data && response.data.errorCode) {
          // ビジネスエラー情報が response.data.errorCode と response.data.errorMessage に含まれると仮定する
          const businessError = {
            code: response.data.errorCode,
            message: response.data.errorMessage,
          };
          return Promise.reject(businessError);
        }
        return response; // 完全なレスポンスオブジェクトを返す
      },
      (error: AxiosError) => {
        // レスポンスエラーを処理する
        this.handleError(error);
        return Promise.reject(error);
      }
    );
  }

  // トークンを取得するメソッド（トークンは localStorage に保存されていると仮定する）
  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  // GET リクエストメソッド
  public async get<T>(
    url: string,
    params?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.get<T>(url, {
        params,
        ...config,
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // POST リクエストメソッド
  public async post<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.post<T>(
        url,
        data,
        config
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // PUT リクエストメソッド
  public async put<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.put<T>(
        url,
        data,
        config
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // DELETE リクエストメソッド
  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.delete<T>(
        url,
        config
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // エラーを処理するメソッド
  private handleError(error: AxiosError | any): void {
    if (axios.isAxiosError(error)) {
      console.error('リクエストエラー:', error.message);
      if (error.response) {
        console.error('ステータスコード:', error.response.status);
        console.error('レスポンスデータ:', error.response.data);
      }
    } else if (error && error.code && error.message) {
      // ビジネスエラーを処理する
      console.error('ビジネスエラーコード:', error.code);
      console.error('ビジネスエラーメッセージ:', error.message);
      alert(`エラーコード: ${error.code}, エラーメッセージ: ${error.message}`);
    } else {
      console.error('未知のエラー:', error);
    }
  }
}

// アプリケーション全体で同じインスタンスを共有するためにシングルトンオブジェクトを作成する
const baseURL = ''; // 実際の状況に応じて baseURL を設定してください
const apiService = new ApiService(baseURL);

export default apiService;
