import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import articleReducer from './ArticleSlice/ArticleSlice';
import UsersSlice from './usersSlice/userSlice';
import { baseApi } from './baseApi';
const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  article: articleReducer,
  users: UsersSlice,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
