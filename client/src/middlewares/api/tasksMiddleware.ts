/* eslint-disable brace-style */
import { Dispatch } from 'react';
import { AnyAction, Middleware } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';

import { redirect, useNavigate } from 'react-router-dom';

// Axios instance
import axiosInstance from '../../services/axiosInstance';
import useAxiosInstance from '../../services/useAxiosInstance';

// Component
import { openSnackbar } from '../../actions/snackbar';

// Actions
import { startLoading, stopLoading } from '../../actions/loading';
import {
  GET_TASKS_FROM_ORGANISATION,
  CREATE_NEW_TASK,
  setAllTasks,
  TasksActionTypes,
  DELETE_TASK,
  getTasksFromOrganisation,
  REPEAT_TASK,
  EDIT_TASK,
} from '../../actions/tasks';
import { getOrganisationDetails } from '../../actions/organisation';
import { redirectTo } from '../../actions/redirect';

// TODO
// Handle redirection when creating new task
const tasksMiddleware: Middleware =
  (store) => (next: Dispatch<AnyAction>) => async (action: TasksActionTypes) => {
    switch (action.type) {
      case GET_TASKS_FROM_ORGANISATION: {
        try {
          store.dispatch(startLoading());

          const response: AxiosResponse = await axiosInstance.get(
            `${process.env.REACT_APP_API_URL}/tasks/${action.payload}`,
          );

          if (response.status === 200) {
            const { data } = response;
            console.log('dispatching tasks');
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
      // --------------------------------------------------------------------------------
      // ------------------------------  NEW  -------------------------------------------
      // --------------------------------------------------------------------------------
      case CREATE_NEW_TASK: {
        try {
          store.dispatch(startLoading());

          const response: AxiosResponse = await axiosInstance.post(
            `${process.env.REACT_APP_API_URL}/tasks`,
            action.payload,
          );

          if (response.status === 201) {
            const { message, status, savedTask } = response.data;
            store.dispatch(getTasksFromOrganisation(savedTask.orgaId));
            store.dispatch(openSnackbar({ type: status, message: message }));
            store.dispatch(redirectTo(`/orga/${savedTask.orgaId}`));
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
      // --------------------------------------------------------------------------------
      // ------------------------------  EDIT  ------------------------------------------
      // --------------------------------------------------------------------------------
      case EDIT_TASK: {
        try {
          store.dispatch(startLoading());

          const response: AxiosResponse = await axiosInstance.patch(
            // eslint-disable-next-line no-underscore-dangle
            `${process.env.REACT_APP_API_URL}/tasks/${action.payload._id}`,
            action.payload,
          );

          if (response.status === 200) {
            const { message, status, updatedTask } = response.data;
            store.dispatch(getOrganisationDetails(updatedTask?.orgaId));
            store.dispatch(openSnackbar({ type: status, message: message }));
            console.log('updatedTask', response);
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
      // --------------------------------------------------------------------------------
      // ------------------------------  DELETE  ----------------------------------------
      // --------------------------------------------------------------------------------
      case DELETE_TASK: {
        try {
          store.dispatch(startLoading());

          const response: AxiosResponse = await axiosInstance.delete(
            `${process.env.REACT_APP_API_URL}/tasks/${action.payload}`,
          );

          if (response.status === 200) {
            const { message, status, deletedTask } = response.data;
            store.dispatch(getOrganisationDetails(deletedTask?.orgaId));
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
      // --------------------------------------------------------------------------------
      // ------------------------------  RESET  ----------------------------------------
      // --------------------------------------------------------------------------------
      case REPEAT_TASK: {
        try {
          store.dispatch(startLoading());

          const response: AxiosResponse = await axiosInstance.patch(
            `${process.env.REACT_APP_API_URL}/tasks/${action.payload}/reset`,
          );

          if (response.status === 200) {
            const { message, status, updatedTask } = response.data;
            store.dispatch(getOrganisationDetails(updatedTask?.orgaId));
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
