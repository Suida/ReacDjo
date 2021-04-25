import {
  put,
  takeEvery,
  call,
  all,
} from 'redux-saga/effects';
import dayjs from 'dayjs';
import request from '@/api/request';
import { Article } from '@/components/Article';
import { updateArticles } from './slice';

const API_URL = "http://192.168.101.5:8000";

function* _fetchArticles() {
  try {
    const res = yield call(request.get, `${API_URL}/article/`)
    const articles: Article[] = (res.data as any[]).map(({
      raw_content,
      html_content,
      created_at,
      modified_at,
      ...rest
    }) => ({
      rawContent: raw_content,
      htmlContent: html_content || '',
      createdAt: dayjs(created_at),
      modifiedAt: dayjs(modified_at),
      ...rest
    }))
    yield put(updateArticles(articles));
  }
  catch(error) {
    console.log(error);
  }

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
