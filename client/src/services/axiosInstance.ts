import axios, { AxiosResponse } from 'axios';

const tokenAuth = localStorage.getItem('auth_token');

// Axios instance
const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${tokenAuth}`,
  },
});

// Axios instance
const axiosNotificationInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_NOTIFICATIONS_URL}`,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${tokenAuth}`,
  },
});

// axiosInstance.interceptors.request.use(
//   (config) => {
//     console.log('intercepting request', config);

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

export default axiosInstance;
