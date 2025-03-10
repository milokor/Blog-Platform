import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { articlesApi } from '../ArticlesApi/api';
import { AppDispatch } from '../store';
export interface mainState {
  auth: boolean;
  profile: {
    following: boolean;
    username: string;
    image: string;
  };
}
type userData = {
  following: boolean;
  username: string;
  image: string;
};

const initialState: mainState = {
  auth: false,
  profile: {
    following: false,
    username: '',
    image: '',
  },
};
export const UsersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthStatus: (state, action: PayloadAction<boolean>) => {
      state.auth = action.payload;
    },
    setUserDate: (state, action: PayloadAction<userData>) => {
      state.profile = action.payload;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.profile.username = action.payload;
    },
    logOut: (state) => {
      state.profile = initialState.profile;
      state.auth = initialState.auth;
    },
  },
});

export const logout = () => (dispatch: AppDispatch) => {
  dispatch(UsersSlice.actions.logOut());
  dispatch(articlesApi.util.resetApiState());
  localStorage.removeItem('authToken');
};
export const { setAuthStatus, setUserDate, setUserName } = UsersSlice.actions;
export default UsersSlice.reducer;
