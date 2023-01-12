/* eslint-disable brace-style */
import { Dispatch } from 'react';
import { AnyAction, Middleware } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';

// Axios instance
import axiosInstance from '../../services/axiosInstance';

// Component
import { openSnackbar } from '../../actions/snackbar';

// Actions
import { startLoading, stopLoading } from '../../actions/loading';
import { CHECK_USER_INVITATIONS, OrganisationsActionTypes } from '../../actions/organisation';

const userMiddleware: Middleware =
  (store) => (next: Dispatch<AnyAction>) => async (action: OrganisationsActionTypes) => {
    switch (action.type) {
      case CHECK_USER_INVITATIONS: {
        try {
          store.dispatch(startLoading());
          const response: AxiosResponse = await axiosInstance.patch(
            `${process.env.REACT_APP_API_URL}/users/${action.payload}`,
          );

          if (response.status === 200) {
            // Not sure if we need this anymore
            next(action);
          }

          next(action);
        } catch (error) {
          // If no notification, returns
          if (axios.isAxiosError(error) && error.response?.status === 404) return;
          // Else handles error
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

export default userMiddleware;
