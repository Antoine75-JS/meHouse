import { combineReducers } from '@reduxjs/toolkit';

// import userReducer from "./user";
import loadingReducer from './loading';
// import errSnackbarReducer from "./errSnackbar";

const rootReducer = combineReducers({
  // user: userReducer,
  loading: loadingReducer,
  // errSnacbar: errSnackbarReducer,
});

export default rootReducer;
