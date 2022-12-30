import { combineReducers } from '@reduxjs/toolkit';

import loadingReducer from './loading';
import tasksReducer from './tasks';
import userReducer from './user';
import snackbarReducer from './snackbar';
import organisationReducer from './organisations';
import categoriesReducer from './categories';
import redirectReducer from './redirect';

const rootReducer = combineReducers({
  loading: loadingReducer,
  tasks: tasksReducer,
  user: userReducer,
  snackbar: snackbarReducer,
  organisation: organisationReducer,
  categories: categoriesReducer,
  redirect: redirectReducer,
});

export default rootReducer;
