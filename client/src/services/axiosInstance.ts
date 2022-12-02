import axios from 'axios';

const tokenAuth = localStorage.getItem('auth_token');

// Axios instance
const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${tokenAuth}`,
  },
});

export default axiosInstance;
