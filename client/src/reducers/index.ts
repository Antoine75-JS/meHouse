import { combineReducers } from '@reduxjs/toolkit';

import loadingReducer from './loading';
import tasksReducer from './tasks';
import userReducer from './user';
import snackbarReducer from './snackbar';

const rootReducer = combineReducers({
  loading: loadingReducer,
  tasks: tasksReducer,
  user: userReducer,
  snackbar: snackbarReducer,
});

export default rootReducer;
