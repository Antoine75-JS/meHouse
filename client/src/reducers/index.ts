import { combineReducers } from '@reduxjs/toolkit';

import loadingReducer from './loading';
import tasksReducer from './tasks';
import userReducer from './user';

const rootReducer = combineReducers({
  loading: loadingReducer,
  tasks: tasksReducer,
  user: userReducer,
});

export default rootReducer;
