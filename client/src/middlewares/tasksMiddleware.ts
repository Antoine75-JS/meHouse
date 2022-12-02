/* eslint-disable brace-style */
import { Dispatch } from 'react';
import { AnyAction, Middleware } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';

import { startLoading, stopLoading } from '../actions/loading';
import { GET_ALL_TASKS, setAllTasks, TasksActionTypes } from '../actions/tasks';

// import { openErrorSnackbar } from '../actions/errorSnackbar';

import axiosInstance from '../services/axiosInstance';
import { openSnackbar } from '../actions/snackbar';

const tasksMiddleware: Middleware =
  (store) => (next: Dispatch<AnyAction>) => async (action: TasksActionTypes) => {
    switch (action.type) {
      case GET_ALL_TASKS:
        try {
          store.dispatch(startLoading());

          const response: AxiosResponse = await axiosInstance.get(
            `${process.env.REACT_APP_API_URL}/tasks`,
          );

          if (response.status === 200) {
            const { data } = response;
            store.dispatch(setAllTasks(data?.tasksFound));
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
          console.log('stop loading');
        }
        break;

      default:
        next(action);
    }
  };

export default tasksMiddleware;
