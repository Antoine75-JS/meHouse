/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable brace-style */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Dispatch } from 'react';
import { AnyAction, Middleware } from '@reduxjs/toolkit';

import axios, { AxiosResponse } from 'axios';

import {
  AuthActionTypes,
  setUserLogged,
  SUBMIT_LOGIN,
  CHECK_USER_LOGGED,
  SUBMIT_LOGOUT,
  logoutUser,
  SUBMIT_SIGNUP,
  submitLogin,
} from '../actions/auth';
import { startLoading, stopLoading } from '../actions/loading';

import { openSnackbar } from '../actions/snackbar';

import axiosInstance from '../services/axiosInstance';

const authMiddleWare: Middleware =
  (store) => (next: Dispatch<AnyAction>) => async (action: AuthActionTypes) => {
    switch (action.type) {
      // SIGNUP USER
      case SUBMIT_SIGNUP: {
        store.dispatch(startLoading());

        try {
          const response: AxiosResponse = await axiosInstance.post(
            `${process.env.REACT_APP_API_URL}/auth/signup`,
            action.payload,
          );

          if (response.status === 201 && response.data?.newUser) {
            store.dispatch(submitLogin(action.payload));
            store.dispatch(openSnackbar({ type: 'success', message: response.data.message }));
          }
          next(action);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            const { message, status } = error?.response?.data || undefined;
            store.dispatch(openSnackbar({ type: status, message: message }));
          } else {
            store.dispatch(openSnackbar({ type: 'error', message: 'An error occured' }));
          }
        } finally {
          store.dispatch(stopLoading());
        }
        break;
      }
      // LOGIN USER
      case SUBMIT_LOGIN: {
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
            store.dispatch(
              openSnackbar({
                type: 'success',
                message: `Welcome back ${response.data?.user?.username}`,
              }),
            );
          }

          next(action);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            const { message, status } = error?.response?.data || undefined;
            store.dispatch(openSnackbar({ type: status, message: message }));
          } else {
            store.dispatch(openSnackbar({ type: 'error', message: 'An error occured' }));
          }
        } finally {
          store.dispatch(stopLoading());
        }
        break;
      }
      // CHECK USER LOGGED
      case CHECK_USER_LOGGED: {
        store.dispatch(startLoading());

        try {
          const response: AxiosResponse = await axiosInstance.get(
            `${process.env.REACT_APP_API_URL}/auth/checkauthtoken`,
          );

          if (response.status === 200) {
            store.dispatch(setUserLogged(response.data?.user));
            store.dispatch(
              openSnackbar({
                type: 'success',
                message: `Welcome back ${response.data?.user?.username}`,
              }),
            );
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            const { message, status } = error?.response?.data || undefined;
            store.dispatch(openSnackbar({ type: status, message: message }));
          } else {
            store.dispatch(openSnackbar({ type: 'error', message: 'An error occured' }));
          }
        } finally {
          store.dispatch(stopLoading());
        }
        break;
      }
      // REMOVE TOKEN THEN LOG USER OUT
      case SUBMIT_LOGOUT: {
        store.dispatch(startLoading());
        try {
          localStorage.removeItem('auth_token');

          const response: AxiosResponse = await axios.get(
            `${process.env.REACT_APP_API_URL}/auth/logout`,
            {
              withCredentials: true,
            },
          );

          if (response.status === 200) {
            store.dispatch(logoutUser());
            store.dispatch(openSnackbar({ type: 'success', message: response.data.message }));
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            const { message, status } = error?.response?.data || undefined;
            store.dispatch(openSnackbar({ type: status, message: message }));
          } else {
            store.dispatch(openSnackbar({ type: 'error', message: 'An error occured' }));
          }
        } finally {
          store.dispatch(stopLoading());
        }
        break;
      }
      default:
        next(action);
    }
  };

export default authMiddleWare;
