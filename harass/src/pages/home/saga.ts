import {
  put,
  takeEvery,
  call,
  all,
} from 'redux-saga/effects';
import axios from 'axios';

const API_URL = "http://localhost:8000";

function* _fetchArticles() {
  const res = yield call(axios.get, `${API_URL}/article/`)
  console.log("response:", res);
}

export const FETCH_ARTICLES = "FETCH_ARTICLES";

export const fetchArticles = () => ({
  type: FETCH_ARTICLES,
});

export function* watchFetchArticles() {
  yield takeEvery(FETCH_ARTICLES, _fetchArticles);
}

export default function* rootSaga() {
  yield all([
    watchFetchArticles(),
  ]);
}
