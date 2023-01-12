import axios, { AxiosResponse } from 'axios';

// Axios instance
const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  withCredentials: true,
});

// Axios instance
const axiosNotificationInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_NOTIFICATIONS_URL}`,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const tokenAuth = localStorage.getItem('auth_token');
    const authorization = `Bearer ${tokenAuth}`;

    if (config.headers) config.headers.authorization = authorization;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
