import { createSlice, PayloadAction, Selector } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { Article, } from '@/components/Article';
import { RootState } from '@/store';

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

export const selectArticles: Selector<RootState, Article[]> = state => state.home.articles;

export default slice.reducer;
