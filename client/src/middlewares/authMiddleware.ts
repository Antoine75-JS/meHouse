/* eslint-disable brace-style */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Dispatch } from 'react';
import { AnyAction, Middleware } from '@reduxjs/toolkit';

import axios, { AxiosResponse } from 'axios';

import { AuthActionTypes, setUserLogged, SUBMIT_LOGIN } from '../actions/auth';
import { startLoading, stopLoading } from '../actions/loading';

// import { openErrorSnackbar } from '../actions/errorSnackbar';

import axiosInstance from '../services/axiosInstance';

const authMiddleWare: Middleware =
  (store) => (next: Dispatch<AnyAction>) => async (action: AuthActionTypes) => {
    switch (action.type) {
      case SUBMIT_LOGIN:
        store.dispatch(startLoading());

        try {
          console.log('login action', action);
          const response: AxiosResponse = await axiosInstance.post(
            `${process.env.REACT_APP_API_URL}/auth/login`,
            action.payload,
          );

          console.log(response);
          if (response.status === 200) {
            const { user } = response.data;
            console.log('logged', user);
            store.dispatch(setUserLogged(user));
          }
          next(action);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.log('axios error:', error.response);
            // HANDLE RESPONSE
            // HANDLE RESPONSE
            // HANDLE RESPONSE
            // HANDLE RESPONSE
            // HANDLE RESPONSE
            // HANDLE RESPONSE
            // HANDLE RESPONSE
            // HANDLE RESPONSE
            // HANDLE RESPONSE
            // HANDLE RESPONSE
            // HANDLE RESPONSE
            // HANDLE RESPONSE
            // HANDLE RESPONSE
            // HANDLE RESPONSE
            // HANDLE RESPONSE
            // HANDLE RESPONSE
            // HANDLE RESPONSE
            // HANDLE RESPONSE
            // HANDLE RESPONSE
            // HANDLE RESPONSE
            // HANDLE RESPONSE
            // HANDLE RESPONSE
            // HANDLE RESPONSE
            // HANDLE RESPONSE
            // const { message, status } = err.response?.data;
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
