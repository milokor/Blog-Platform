import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface mainState {
  mainPage: number;
  pageSize: number;
}
const initialState: mainState = {
  mainPage: 0,
  pageSize: 20,
};
export const ArticleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<mainState>) => {
      state.mainPage = 0;
      state.pageSize = action.payload.pageSize;
      state.mainPage += action.payload.mainPage;
    },
  },
});

export const { setCurrentPage } = ArticleSlice.actions;
export default ArticleSlice.reducer;
