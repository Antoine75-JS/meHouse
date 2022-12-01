import { combineReducers } from '@reduxjs/toolkit';

import loadingReducer from './loading';
import tasksReducer from './tasks';

const rootReducer = combineReducers({
  loading: loadingReducer,
  tasks: tasksReducer,
});

export default rootReducer;
