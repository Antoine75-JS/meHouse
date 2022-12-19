/* eslint-disable brace-style */
import { Dispatch } from 'react';
import { AnyAction, Middleware } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';

// Axios instance
import axiosNotificationInstance from '../../services/axiosInstance';

// Component
import { openSnackbar } from '../../actions/snackbar';

// Actions
import { startLoading, stopLoading } from '../../actions/loading';
import { CREATE_INVITE_NOTIFICATION } from '../../actions/notification';

// TODO
// Handle redirection when creating new task
const tasksMiddleware: Middleware = (store) => (next: Dispatch<AnyAction>) => async (action) => {
  switch (action.type) {
    case CREATE_INVITE_NOTIFICATION: {
      try {
        store.dispatch(startLoading());

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
