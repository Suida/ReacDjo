import { createStore, applyMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {
  all,
} from 'redux-saga/effects';
import homeSlice from '@/pages/home/slice';
import homeSaga from '@/pages/home/saga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  homeSlice,
  applyMiddleware(sagaMiddleware),
);

export function* rootSaga() {
  yield all([
    homeSaga(),
  ]);
}

sagaMiddleware.run(rootSaga);

export default store;
