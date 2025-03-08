import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../constants';

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders(headers) {
      const token = localStorage.getItem('authToken');
      const tokenParse = token ? JSON.parse(token).token : null;
      if (token) {
        headers.set('Authorization', `Token ${tokenParse}`);
      }
      return headers;
    },
  }),

  tagTypes: ['users', 'article', 'ArticleList'],
  endpoints: () => ({}),
});
