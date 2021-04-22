import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

export interface Article {
  title: string,
  rawContent: string,
  author: number,
  createAt: dayjs.Dayjs,
  modifiedAt: dayjs.Dayjs,
};

export const slice = createSlice({
  name: 'home',
  initialState: {
    articles: [],
  },
  reducers: {
    updateArticles: (state, action) => {
      state.articles = action.payload;
    },
    clearArticles: (state) => {
      state.articles = [];
    }
  }
});

export const { updateArticles, clearArticles } = slice.actions;

export const selectArticles = (state: any) => state.articles;

export default slice.reducer;
