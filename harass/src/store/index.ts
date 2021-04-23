import {
  createStore,
  applyMiddleware,
  combineReducers,
} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all, } from 'redux-saga/effects';
import { composeWithDevTools } from 'redux-devtools-extension';
import homeReducer from '@/pages/home/slice';
import homeSaga from '@/pages/home/saga';

const rootReducer = combineReducers({
  home: homeReducer,
})

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = composeWithDevTools({});

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(sagaMiddleware),
  )
);

export function* rootSaga() {
  yield all([
    homeSaga(),
  ]);
}

sagaMiddleware.run(rootSaga);

export default store;
