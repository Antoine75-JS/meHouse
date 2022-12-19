import { configureStore, applyMiddleware } from '@reduxjs/toolkit';

// IGNORE LINT OTHERWITE CAN'T USE DEVTOOLS EXTENTION AS A DEV DEPENDENCY
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension';

// API middlewares
import authMiddleware from '../middlewares/api/authMiddleware';
import tasksMiddleware from '../middlewares/api/tasksMiddleware';
import organisationsMiddleware from '../middlewares/api/organisationsMiddleware';
import categoriesMiddleware from '../middlewares/api/categoriesMiddleware';
import userMiddleware from '../middlewares/api/userMiddleware';

// NOTIFICATIONS middlewares
import invitationNotifMiddleware from '../middlewares/notifications/invitationNotifMiddleware';

// Import reducers
import reducer from '../reducers';

const middlewares = applyMiddleware(
  // API
  authMiddleware,
  tasksMiddleware,
  organisationsMiddleware,
  categoriesMiddleware,
  userMiddleware,
  // NOTIFICATIONS SERVICE
  invitationNotifMiddleware,
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
