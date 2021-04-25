import { createSlice, PayloadAction, Selector } from '@reduxjs/toolkit';
import { RootState } from '@/store';

const initialState: {
  showProgress: boolean,
  percentage: number,
} = {
  showProgress: false,
  percentage: 0,  // Range: [0, 1]
};

export const slice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    showProgress: (state) => {
      state.showProgress = true;
    },
    hideProgress: (state) => {
      state.showProgress = false;
    },
    toggleProgress: (state, { payload }: PayloadAction<boolean>) => {
      state.showProgress = payload
    },
    updatePercentage: (state, action: PayloadAction<number>) => {
      state.percentage = action.payload;
    },
  }
});

export const { toggleProgress, showProgress, hideProgress, updatePercentage } = slice.actions;

export const selectShowProgress: Selector<RootState, boolean> = state => state.api.showProgress;

export const selectPercentage: Selector<RootState, number> = state => state.api.percentage;

export default slice.reducer;
