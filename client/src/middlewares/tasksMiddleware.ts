/* eslint-disable brace-style */
import { Dispatch } from 'react';
import { AnyAction, Middleware } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';

import { startLoading, stopLoading } from '../actions/loading';
import {
  GET_ALL_TASKS,
  CREATE_NEW_TASK,
  setAllTasks,
  TasksActionTypes,
  getAllTasks,
  DELETE_TASK,
} from '../actions/tasks';

// import { openErrorSnackbar } from '../actions/errorSnackbar';

import axiosInstance from '../services/axiosInstance';
import { openSnackbar } from '../actions/snackbar';

// TODO
// Handle redirection when creating new task
const tasksMiddleware: Middleware =
  (store) => (next: Dispatch<AnyAction>) => async (action: TasksActionTypes) => {
    switch (action.type) {
      case GET_ALL_TASKS: {
        console.log('getting all tasks');
        try {
          store.dispatch(startLoading());

          const response: AxiosResponse = await axiosInstance.get(
            `${process.env.REACT_APP_API_URL}/tasks`,
          );

          if (response.status === 200) {
            const { data } = response;
            console.log('New tasks', data);
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
      }
      case CREATE_NEW_TASK: {
        try {
          store.dispatch(startLoading());
          console.log(action.payload);

          const response: AxiosResponse = await axiosInstance.post(
            `${process.env.REACT_APP_API_URL}/tasks`,
            action.payload,
          );

          console.log('response from creating task', response);

          if (response.status === 201) {
            const { message, status } = response.data;
            console.log('success');
            store.dispatch(openSnackbar({ type: status, message: message }));
            store.dispatch(getAllTasks());
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
      case DELETE_TASK: {
        try {
          store.dispatch(startLoading());
          console.log(action.payload);

          const response: AxiosResponse = await axiosInstance.delete(
            `${process.env.REACT_APP_API_URL}/tasks/${action.payload}`,
          );

          console.log('response from deleting task', response);

          if (response.status === 200) {
            const { message, status } = response.data;
            console.log('success');
            store.dispatch(openSnackbar({ type: status, message: message }));
            store.dispatch(getAllTasks());
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
      default:
        next(action);
    }
  };

export default tasksMiddleware;
