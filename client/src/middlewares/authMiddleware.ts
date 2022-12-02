/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable brace-style */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Dispatch } from 'react';
import { AnyAction, Middleware } from '@reduxjs/toolkit';

import axios, { AxiosResponse } from 'axios';

import { AuthActionTypes, setUserLogged, SUBMIT_LOGIN, CHECK_USER_LOGGED } from '../actions/auth';
import { startLoading, stopLoading } from '../actions/loading';

// import { openErrorSnackbar } from '../actions/errorSnackbar';

import axiosInstance from '../services/axiosInstance';

const authMiddleWare: Middleware =
  (store) => (next: Dispatch<AnyAction>) => async (action: AuthActionTypes) => {
    switch (action.type) {
      // LOGIN USER
      case SUBMIT_LOGIN:
        store.dispatch(startLoading());

        try {
          const response: AxiosResponse = await axiosInstance.post(
            `${process.env.REACT_APP_API_URL}/auth/login`,
            action.payload,
          );

          if (response.status === 200 && response.data?.auth_token) {
            const { user, auth_token } = response.data;

            localStorage.setItem('auth_token', auth_token);
            store.dispatch(setUserLogged(user));
          }
          next(action);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.log('axios error:', error.response);
            // const { message, status } = err.response?.data;
            // HANDLE RESPONSE
            // HANDLE RESPONSE
            // HANDLE RESPONSE
            // HANDLE RESPONSE
          } else {
            console.log('not axios error', error);
          }
        } finally {
          store.dispatch(stopLoading());
        }
        break;
      // CHECK USER LOGGED
      case CHECK_USER_LOGGED:
        store.dispatch(startLoading());

        try {
          const response: AxiosResponse = await axiosInstance.get(
            `${process.env.REACT_APP_API_URL}/auth/checkauthtoken`,
          );
          console.log(response);

          if (response.status === 200) {
            console.log('check logged response', response);
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.log('axios error:', error.response);
            // const { message, status } = err.response?.data;
            // HANDLE RESPONSE
            // HANDLE RESPONSE
            // HANDLE RESPONSE
            // HANDLE RESPONSE
          } else {
            console.log('not axios error', error);
          }
        } finally {
          store.dispatch(stopLoading());
        }
        break;

      default:
        next(action);
    }
  };

export default authMiddleWare;
