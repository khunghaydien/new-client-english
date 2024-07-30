import { ACCESS_TOKEN, HEADER_DATA_FORM_FILE, HEADER_DEFAULT, REFRESH_TOKEN, TIMEOUT } from '@/const';
import { HttpStatusCode } from '@/enum/api.enum';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
export interface ApiResponse<T = any> {
    status: HttpStatusCode
    body: T
}
class HttpService {
    axios: any;
    getCredential: any;
    constructor(axios: any, getCredential: any) {
        this.axios = axios;
        this.getCredential = getCredential;
    }
    request(config?: AxiosRequestConfig) {
        config = this.getCredential(config);
        return this.axios.request(config);
    }
    get(url: string, config?: AxiosRequestConfig) {
        config = this.getCredential(config);
        return this.axios.get(url, config);
    }
    post(url: string, data?: any, config?: AxiosRequestConfig) {
        config = this.getCredential(config);
        return this.axios.post(url, data, config);
    }
    put(url: string, data?: any, config?: AxiosRequestConfig) {
        config = this.getCredential(config);
        return this.axios.put(url, data, config);
    }
    patch(url: string, data?: any, config?: AxiosRequestConfig) {
        config = this.getCredential(config);
        return this.axios.patch(url, data, config);
    }
    delete(url: string, config?: AxiosRequestConfig) {
        config = this.getCredential(config);
        return this.axios.delete(url, config);
    }
}

const defaultConfig = (headers: any) => ({
    baseURL: 'http://localhost:3030',
    headers: { ...headers },
    timeout: TIMEOUT,
});

const getCredentialWithAccessToken = (config: any = {}) => {
    let accessToken: string = '';
    accessToken = localStorage.getItem(ACCESS_TOKEN) || '';
    if (!accessToken) return config;
    return {
        ...config,
        headers: {
            ...(config.headers || {}),
            Authorization: 'Bearer ' + accessToken,
        },
    };
};

let refreshTokenInProgress = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const onRefreshed = (token: string) => {
    refreshSubscribers.forEach((callback) => callback(token));
};

const addRefreshSubscriber = (callback: (token: string) => void) => {
    refreshSubscribers.push(callback);
};

const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    if (!refreshToken) {
        throw new Error('No refresh token available');
    }
    const response = await axios.post(`http://localhost:3030/auth/refresh`, { refreshToken });
    const { access_token, refresh_token } = response.data;
    localStorage.setItem(ACCESS_TOKEN, access_token);
    localStorage.setItem(REFRESH_TOKEN, refresh_token);
    return access_token;
};

const configInterceptors = (axiosClient: any) => {
    axiosClient.interceptors.response.use(
        (res: AxiosResponse) => res.data,
        async (error: any) => {
            const { config, response: { status } } = error;
            if (status === HttpStatusCode.UNAUTHORIZED && !config._retry) {
                if (!localStorage.getItem(REFRESH_TOKEN)) {
                    localStorage.removeItem(ACCESS_TOKEN);
                    window.location.href = '/sign-in'
                    return Promise.reject(error);
                }

                if (refreshTokenInProgress) {
                    return new Promise((resolve, reject) => {
                        addRefreshSubscriber((token: string) => {
                            config.headers.Authorization = `Bearer ${token}`;
                            resolve(axios(config));
                        });
                    });
                }

                config._retry = true;
                refreshTokenInProgress = true;

                try {
                    const newAccessToken = await refreshAccessToken();
                    refreshTokenInProgress = false;
                    onRefreshed(newAccessToken);
                    config.headers.Authorization = `Bearer ${newAccessToken}`;
                    return axios(config);
                } catch (refreshError) {
                    refreshTokenInProgress = false;
                    refreshSubscribers = [];
                    localStorage.removeItem(ACCESS_TOKEN);
                    localStorage.removeItem(REFRESH_TOKEN);
                    window.location.href = '/sign-in'
                    return Promise.reject(refreshError);
                }
            }

            return Promise.reject(
                error?.response?.data?.errors || { status: status || 0 }
            );
        }
    );
    return axiosClient;
};

const axiosClient = configInterceptors(
    axios.create(defaultConfig(HEADER_DEFAULT))
);

const axiosClientFormFile = configInterceptors(
    axios.create(defaultConfig(HEADER_DATA_FORM_FILE))
);

const ApiClientWithToken = new HttpService(
    axiosClient,
    getCredentialWithAccessToken
);

export const ApiClientFormFile = new HttpService(
    axiosClientFormFile,
    getCredentialWithAccessToken
);

const publicClientConfigInterceptors = (axiosClient: any) => {
    axiosClient.interceptors.response.use(
        (res: AxiosResponse) => res.data,
        (res: any) => Promise.reject(res.response?.data)
    );
    return axiosClient;
};

export const publicClient = publicClientConfigInterceptors(
    axios.create(defaultConfig(HEADER_DEFAULT))
);

export default ApiClientWithToken;