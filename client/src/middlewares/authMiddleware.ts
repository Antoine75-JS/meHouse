/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Dispatch } from 'react';
import { AnyAction, Middleware } from '@reduxjs/toolkit';
// import axios, { AxiosResponse } from 'axios';
// import { AuthActionTypes, SUBMIT_LOGIN, setUserLogged } from '../actions/auth';
import { startLoading, stopLoading } from '../actions/loading';
// import { openErrorSnackbar } from '../actions/errorSnackbar';

const authMiddleWare: Middleware = (store) => (next: Dispatch<AnyAction>) => (action: any) => {};

export default authMiddleWare;
