/* eslint-disable brace-style */
import { Dispatch } from 'react';
import { AnyAction, Middleware } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';

import { startLoading, stopLoading } from '../actions/loading';
import {
  GET_TASKS_FROM_ORGANISATION,
  CREATE_NEW_TASK,
  setAllTasks,
  TasksActionTypes,
  DELETE_TASK,
  getTasksFromOrganisation,
} from '../actions/tasks';

// import { openErrorSnackbar } from '../actions/errorSnackbar';

import axiosInstance from '../services/axiosInstance';
import { openSnackbar } from '../actions/snackbar';

// TODO
// Handle redirection when creating new task
const tasksMiddleware: Middleware =
  (store) => (next: Dispatch<AnyAction>) => async (action: TasksActionTypes) => {
    switch (action.type) {
      case GET_TASKS_FROM_ORGANISATION: {
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
        }
        break;
      }
      case CREATE_NEW_TASK: {
        try {
          store.dispatch(startLoading());
          console.log('creating task', action.payload);

          const response: AxiosResponse = await axiosInstance.post(
            `${process.env.REACT_APP_API_URL}/tasks`,
            action.payload,
          );

          if (response.status === 201) {
            const { message, status, createdTask } = response.data;
            store.dispatch(getTasksFromOrganisation(createdTask.orgaId));
            store.dispatch(openSnackbar({ type: status, message: message }));
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

          const response: AxiosResponse = await axiosInstance.delete(
            `${process.env.REACT_APP_API_URL}/tasks/${action.payload}`,
          );

          if (response.status === 200) {
            const { message, status, deletedTask } = response.data;
            store.dispatch(getTasksFromOrganisation(deletedTask?.orgaId));
            store.dispatch(openSnackbar({ type: status, message: message }));
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
