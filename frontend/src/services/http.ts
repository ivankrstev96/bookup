import axios, {InternalAxiosRequestConfig} from "axios";
import {clearAccessToken, getAccessToken, getAuthorizationHeaderValue} from "./browserStorageServices.js";

const axiosInstance = axios.create();

const authenticationInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const accessToken = getAccessToken();

    if (accessToken) {
      config.headers!['Authorization'] = getAuthorizationHeaderValue(accessToken);
    }

    return config;
};

axiosInstance.interceptors.request.use(authenticationInterceptor);

const globalErrorHandler = (error: any) => {

    if (error.response && error.response.status === 401) {
        clearAccessToken();
    }

    return Promise.reject(error);
};

axiosInstance.interceptors.response.use(response => response, globalErrorHandler);

export default axiosInstance;
