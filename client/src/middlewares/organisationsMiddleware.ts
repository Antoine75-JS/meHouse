/* eslint-disable brace-style */
import { Dispatch } from 'react';
import { AnyAction, Middleware } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';

// Axios instance
import axiosInstance from '../services/axiosInstance';

// Components
import { openSnackbar } from '../actions/snackbar';

// Actions
import { startLoading, stopLoading } from '../actions/loading';
import { OrganisationsActionTypes, CREATE_NEW_ORGANISATION } from '../actions/organisation';

// TODO
// Handle redirection when creating new task
const organisationsMiddleware: Middleware =
  (store) => (next: Dispatch<AnyAction>) => async (action: OrganisationsActionTypes) => {
    switch (action.type) {
      case CREATE_NEW_ORGANISATION: {
        try {
          store.dispatch(startLoading());
          console.log(action.payload);
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

export default organisationsMiddleware;
