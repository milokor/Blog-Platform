import { configureStore } from '@reduxjs/toolkit';
import { articlesApi } from './ArticlesApi/api';
import { useDispatch, useSelector } from 'react-redux';
import articleReducer from './ArticleSlice/ArticleSlice';
import UsersSlice from './usersSlice/userSlice';

export const store = configureStore({
  reducer: {
    [articlesApi.reducerPath]: articlesApi.reducer,
    article: articleReducer,
    users: UsersSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articlesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
