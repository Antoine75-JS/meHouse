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
import { GET_USER_NOTIFICATIONS } from '../../actions/notification';
import { resetUserNotifications, setUserNotifications } from '../../actions/auth';

const invitationNotifMiddleware: Middleware =
  (store) => (next: Dispatch<AnyAction>) => async (action) => {
    switch (action.type) {
      case GET_USER_NOTIFICATIONS: {
        try {
          store.dispatch(startLoading());

          const response: AxiosResponse = await axiosNotificationInstance.get(
            `${process.env.REACT_APP_API_NOTIFICATIONS_URL}/${action.payload}`,
          );

          if (response.status === 200) {
            store.dispatch(setUserNotifications(response?.data?.userNotifications));
          }

          next(action);
        } catch (error) {
          if (axios.isAxiosError(error) && error.response?.status === 404) {
            store.dispatch(resetUserNotifications());
            return;
          }

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

export default invitationNotifMiddleware;
