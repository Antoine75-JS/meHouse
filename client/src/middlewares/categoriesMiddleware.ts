/* eslint-disable brace-style */
import { Dispatch } from 'react';
import { AnyAction, Middleware } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';

// Axios instance
import axiosInstance from '../services/axiosInstance';

// Component
import { openSnackbar } from '../actions/snackbar';

// Actions
import { startLoading, stopLoading } from '../actions/loading';
import {
  CREATE_NEW_CATEGORY,
  CategoryActionTypes,
  ADD_CATEGORY_TO_TASK,
} from '../actions/category';
import { getOrganisationDetails } from '../actions/organisation';

// TODO
// Handle redirection when creating new task
const tasksMiddleware: Middleware =
  (store) => (next: Dispatch<AnyAction>) => async (action: CategoryActionTypes) => {
    switch (action.type) {
      case CREATE_NEW_CATEGORY: {
        try {
          store.dispatch(startLoading());
          const response: AxiosResponse = await axiosInstance.post(
            `${process.env.REACT_APP_API_URL}/categories`,
            action.payload,
          );

          if (response.status === 201) {
            const { message, status, savedOrga } = response.data;
            // eslint-disable-next-line no-underscore-dangle
            store.dispatch(getOrganisationDetails(savedOrga?._id));
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
      case ADD_CATEGORY_TO_TASK: {
        try {
          store.dispatch(startLoading());
          const response: AxiosResponse = await axiosInstance.patch(
            `${process.env.REACT_APP_API_URL}/tasks/${action.payload?.taskId}/toggle-category`,
            {
              category: action.payload?.catId,
            },
          );

          if (response.status === 200) {
            const { message, status, updatedTask } = response.data;
            // eslint-disable-next-line no-underscore-dangle
            console.log(updatedTask);
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
