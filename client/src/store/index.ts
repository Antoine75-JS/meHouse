import { configureStore, applyMiddleware } from '@reduxjs/toolkit';

// IGNORE LINT OTHERWITE CAN'T USE DEVTOOLS EXTENTION AS A DEV DEPENDENCY
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension';

// Import middlewares
import authMiddleware from '../middlewares/authMiddleware';
import tasksMiddleware from '../middlewares/tasksMiddleware';
import organisationsMiddleware from '../middlewares/organisationsMiddleware';
import categoriesMiddleware from '../middlewares/categoriesMiddleware';
import userMiddleware from '../middlewares/userMiddleware';

// Import reducers
import reducer from '../reducers';

const middlewares = applyMiddleware(
  authMiddleware,
  tasksMiddleware,
  organisationsMiddleware,
  categoriesMiddleware,
  userMiddleware,
);

// TODO
// Handle serialized errors with dates
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
  devTools: process.env.NODE_ENV !== 'production',
  enhancers: [middlewares],
});

export default store;
