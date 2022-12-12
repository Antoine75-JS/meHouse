import axios, { AxiosResponse } from 'axios';
import axiosInstance from './axiosInstance';

import { startLoading, stopLoading } from '../actions/loading';
import { openSnackbar } from '../actions/snackbar';

const useAxiosInstance = async (
  url: string,
  method: string,
  expectedStatus: number,
  onSuccess: () => any,
) => {
  // console.log('using instance', url, method, expectedStatus, onSuccess);
  // store.dispatch(startLoading());
  // try {
  //   const response: AxiosResponse = await axiosInstance.request({
  //     url: `${process.env.REACT_APP_API_URL + url}`,
  //     method,
  //   });
  //   console.log('response', response);
  //   if (response.status === expectedStatus) {
  //     store.dispatch(onSuccess(response?.data));
  //     store.dispatch(openSnackbar({ type: 'success', message: response.data.message }));
  //   }
  //   // eslint-disable-next-line brace-style
  // } catch (error) {
  //   if (axios.isAxiosError(error)) {
  //     const { message, status } = error?.response?.data || undefined;
  //     store.dispatch(openSnackbar({ type: status, message: message }));
  //     // eslint-disable-next-line brace-style
  //   } else {
  //     store.dispatch(openSnackbar({ type: 'error', message: 'An error occured' }));
  //   }
  // } finally {
  //   store.dispatch(stopLoading());
  //   return response;
  // }
};

export default useAxiosInstance;
