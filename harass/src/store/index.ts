import { createStore, applyMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import homeSlice from '@/pages/home/slice';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  homeSlice,
  applyMiddleware(sagaMiddleware),
);

export default store;
