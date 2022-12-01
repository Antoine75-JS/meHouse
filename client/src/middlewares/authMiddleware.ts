/* eslint-disable brace-style */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Dispatch } from 'react';
import { AnyAction, Middleware } from '@reduxjs/toolkit';
// import axios, { AxiosResponse } from 'axios';
// import { AuthActionTypes, SUBMIT_LOGIN, setUserLogged } from '../actions/auth';
import { startLoading, stopLoading } from '../actions/loading';
import { GET_ALL_TASKS, setAllTasks } from '../actions/tasks';
// import { openErrorSnackbar } from '../actions/errorSnackbar';

import axiosInstance from '../services/axiosInstance';

const authMiddleWare: Middleware =
  (store) => (next: Dispatch<AnyAction>) => async (action: any) => {
    switch (action.type) {
      case GET_ALL_TASKS:
        try {
          store.dispatch(startLoading());

          const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/tasks`);

          if (response.status === 200) {
            const { data } = response;
            store.dispatch(setAllTasks(data?.tasksFound));
          }

          next(action);
        } catch (error) {
          // next(error);
          console.trace('Error from api', error);
        } finally {
          store.dispatch(stopLoading());
          console.log('stop loading');
        }
        break;

      default:
        next(action);
    }
  };

export default authMiddleWare;
