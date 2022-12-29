/* eslint-disable brace-style */
import { Dispatch } from 'react';
import { AnyAction, Middleware } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';

// Axios instance
import axiosInstance from '../../services/axiosInstance';

// Components
import { openSnackbar } from '../../actions/snackbar';

// Actions
import { startLoading, stopLoading } from '../../actions/loading';

import { checkUserLogged } from '../../actions/auth';

import {
  OrganisationsActionTypes,
  CREATE_NEW_ORGANISATION,
  GET_ORGANISATION_DETAILS,
  setOrganisationDetails,
  INVITE_USER_TO_ORGANISATION,
  JOIN_ORGANISATION_WITH_INVITE,
} from '../../actions/organisation';

// TODO
// Handle redirection when creating new task
const organisationsMiddleware: Middleware =
  (store) => (next: Dispatch<AnyAction>) => async (action: OrganisationsActionTypes) => {
    switch (action.type) {
      case GET_ORGANISATION_DETAILS: {
        try {
          console.log('getting orga details');
          store.dispatch(startLoading());

          const response: AxiosResponse = await axiosInstance.get(
            `${process.env.REACT_APP_API_URL}/organisations/${action.payload}`,
          );

          if (response.status === 200) {
            const { orgFound } = response.data;
            store.dispatch(setOrganisationDetails(orgFound));
          }
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
      case CREATE_NEW_ORGANISATION: {
        try {
          store.dispatch(startLoading());

          const response: AxiosResponse = await axiosInstance.post(
            `${process.env.REACT_APP_API_URL}/organisations`,
            action.payload,
          );

          if (response.status === 201) {
            const { message, status } = response.data;

            // TODO
            // Redirect user
            store.dispatch(checkUserLogged());
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
      case INVITE_USER_TO_ORGANISATION: {
        try {
          store.dispatch(startLoading());

          console.log('inviting user action', action);

          const response: AxiosResponse = await axiosInstance.post(
            `${process.env.REACT_APP_API_URL}/organisations/${action?.payload?.orgaId}/invite`,
            action.payload,
          );

          if (response.status === 200) {
            const { message, status } = response.data;
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
      case JOIN_ORGANISATION_WITH_INVITE: {
        try {
          store.dispatch(startLoading());
          axiosInstance.patch(
            `${process.env.REACT_APP_API_URL}/organisations/${action?.payload?.orgaId}/join/${action?.payload?.email}`,
            action.payload,
          );
          console.log(action.payload);
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
