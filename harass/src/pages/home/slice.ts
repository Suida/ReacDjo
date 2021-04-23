import { createSlice, PayloadAction, } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

export interface Article {
  title: string,
  rawContent: string,
  author: number,
  createAt: dayjs.Dayjs,
  modifiedAt: dayjs.Dayjs,
};

const initialState: {
  articles: Article[],
} = {
  articles: [],
};

export const slice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    updateArticles: (state, action: PayloadAction<Article[]>) => {
      state.articles = action.payload;
    },
    clearArticles: (state) => {
      state.articles = [];
    },
  }
});

export const { updateArticles, clearArticles } = slice.actions;

export const selectArticles = (state: any) => state.articles;

export default slice.reducer;
