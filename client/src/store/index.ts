import { configureStore, applyMiddleware } from '@reduxjs/toolkit';

// IGNORE LINT OTHERWITE CAN'T USE DEVTOOLS EXTENTION AS A DEV DEPENDENCY
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension';

// Import middlewares
import authMiddleWare from '../middlewares/authMiddleware';

// Import reducers
import reducer from '../reducers';

const middlewares = applyMiddleware(authMiddleWare);
// eslint-disable-next-line no-underscore-dangle

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
  devTools: process.env.NODE_ENV !== 'production',
  enhancers: [middlewares],
});

export default store;
