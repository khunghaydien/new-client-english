import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const BASE_URL = 'http://localhost:3030'
const ENVIRONMENT = 'development'
const ACCESS_TOKEN = 'accessToken'
const REFRESH_TOKEN = 'refreshToken'
const EMAIL = 'email'
const TIMEOUT = 300000
const HEADER_DEFAULT = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
}
const HEADER_DATA_FORM_FILE = {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
}

export interface ApiResponse<T = any> {
    status: HttpStatusCode
    body: T
}

export enum HttpStatusCode {
    CONTINUE = 100,
    SWITCHING_PROTOCOLS = 101,
    PROCESSING = 102,
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NON_AUTHORITATIVE_INFORMATION = 203,
    NO_CONTENT = 204,
    RESET_CONTENT = 205,
    PARTIAL_CONTENT = 206,
    MULTI_STATUS = 207,
    ALREADY_REPORTED = 208,
    IM_USED = 226,
    MULTIPLE_CHOICES = 300,
    MOVED_PERMANENTLY = 301,
    FOUND = 302,
    SEE_OTHER = 303,
    NOT_MODIFIED = 304,
    USE_PROXY = 305,
    SWITCH_PROXY = 306,
    TEMPORARY_REDIRECT = 307,
    PERMANENT_REDIRECT = 308,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    PAYMENT_REQUIRED = 402,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    NOT_ACCEPTABLE = 406,
    PROXY_AUTHENTICATION_REQUIRED = 407,
    REQUEST_TIMEOUT = 408,
    CONFLICT = 409,
    GONE = 410,
    LENGTH_REQUIRED = 411,
    PRECONDITION_FAILED = 412,
    PAYLOAD_TOO_LARGE = 413,
    URI_TOO_LONG = 414,
    UNSUPPORTED_MEDIA_TYPE = 415,
    RANGE_NOT_SATISFIABLE = 416,
    EXPECTATION_FAILED = 417,
    I_AM_A_TEAPOT = 418,
    MISDIRECTED_REQUEST = 421,
    UNPROCESSABLE_ENTITY = 422,
    LOCKED = 423,
    FAILED_DEPENDENCY = 424,
    UPGRADE_REQUIRED = 426,
    PRECONDITION_REQUIRED = 428,
    TOO_MANY_REQUESTS = 429,
    REQUEST_HEADER_FIELDS_TOO_LARGE = 431,
    UNAVAILABLE_FOR_LEGAL_REASONS = 451,
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504,
    HTTP_VERSION_NOT_SUPPORTED = 505,
    VARIANT_ALSO_NEGOTIATES = 506,
    INSUFFICIENT_STORAGE = 507,
    LOOP_DETECTED = 508,
    NOT_EXTENDED = 510,
    NETWORK_AUTHENTICATION_REQUIRED = 511,
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
    baseURL: BASE_URL,
    headers: { ...headers },
    timeout: TIMEOUT,
});

const getCredentialWithAccessToken = (config: any = {}) => {
    let accessToken: string = '';
    if (ENVIRONMENT === 'development') {
        accessToken = localStorage.getItem(ACCESS_TOKEN) || '';
    }
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
    const response = await axios.post(`${BASE_URL}/auth/refresh`, { refreshToken });
    const { accessToken, refreshToken: newRefreshToken } = response.data;
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.setItem(REFRESH_TOKEN, newRefreshToken);
    return accessToken;
};

const configInterceptors = (axiosClient: any) => {
    axiosClient.interceptors.response.use(
        (res: AxiosResponse) => res.data,
        async (error: any) => {
            const { config, response: { status } } = error;
            if (status === HttpStatusCode.UNAUTHORIZED && !config._retry) {
                if (!localStorage.getItem(REFRESH_TOKEN)) {
                    localStorage.removeItem(ACCESS_TOKEN);
                    localStorage.removeItem(EMAIL);
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
                    localStorage.removeItem(EMAIL);
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

const signInConfigInterceptors = (axiosClient: any) => {
    axiosClient.interceptors.response.use(
        (res: AxiosResponse) => res.data,
        (res: any) => Promise.reject(res.response?.data)
    );
    return axiosClient;
};

export const signInClient = signInConfigInterceptors(
    axios.create(defaultConfig(HEADER_DEFAULT))
);

export default ApiClientWithToken;