import { combineReducers } from '@reduxjs/toolkit';

import loadingReducer from './loading';
import tasksReducer from './tasks';
import userReducer from './user';
import snackbarReducer from './snackbar';
import organisationReducer from './organisations';
import categoriesReducer from './categories';

const rootReducer = combineReducers({
  loading: loadingReducer,
  tasks: tasksReducer,
  user: userReducer,
  snackbar: snackbarReducer,
  organisation: organisationReducer,
  categories: categoriesReducer,
});

export default rootReducer;
