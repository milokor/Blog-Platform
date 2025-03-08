import type {
  ArticleGet,
  articlesResponse,
  ICreateApiArticle,
  IUpdateArticle,
} from '../../types/type';
import { baseApi } from '../baseApi';
const token = localStorage.getItem('authToken');
export const articlesApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    getArticles: create.query<articlesResponse, { mainPage: number; pageSize: number }>({
      query: ({ mainPage, pageSize }) => ({
        url: `/articles?limit=${pageSize}&offset=${mainPage}`,
        headers: {
          Authorization: `Token ${token ? JSON.parse(token).token : null}`,
        },
      }),
      providesTags: ['article'],
    }),

    getArticle: create.query<ArticleGet, { title: string | undefined }>({
      query: ({ title }) => ({
        url: `/articles/${title}`,
        headers: {
          Authorization: `Token ${token ? JSON.parse(token).token : null}`,
        },
      }),
      providesTags: ['article'],
    }),
    createArticle: create.mutation<void, ICreateApiArticle>({
      query: (userdata) => ({
        method: 'POST',
        url: '/articles',
        body: userdata,
        headers: {
          Authorization: `Token ${token ? JSON.parse(token).token : null}`,
        },
      }),
      invalidatesTags: ['article'],
    }),
    deleteArticle: create.mutation<void, { slug: string | undefined }>({
      query: ({ slug }) => ({
        method: 'DELETE',
        url: `/articles/${slug} `,
        headers: {
          Authorization: `Token ${token ? JSON.parse(token).token : null}`,
        },
      }),
      invalidatesTags: ['article'],
    }),
    getArticlesOne: create.query<ArticleGet, { slug: string | undefined }>({
      query: ({ slug }) => `/articles/${slug}`,
      providesTags: ['article'],
    }),
    editArticle: create.mutation<void, IUpdateArticle>({
      query: ({ slug, article }) => ({
        method: 'PUT',
        url: `/articles/${slug}`,
        body: { article },
        headers: {
          Authorization: `Token ${token ? JSON.parse(token).token : null}`,
        },
      }),
      invalidatesTags: ['article'],
    }),
    favoriteAnArticle: create.mutation<void, { slug: string | undefined }>({
      query: ({ slug }) => ({
        method: 'Post',
        url: `/articles/${slug}/favorite`,
        headers: {
          Authorization: `Token ${token ? JSON.parse(token).token : null}`,
        },
      }),
      invalidatesTags: ['article'],
    }),
    deleteFavoriteAnArticle: create.mutation<void, { slug: string | undefined }>({
      query: ({ slug }) => ({
        method: 'Delete',
        url: `/articles/${slug}/favorite`,
        headers: {
          Authorization: `Token ${token ? JSON.parse(token).token : null}`,
        },
      }),
      invalidatesTags: ['article'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetArticlesQuery,
  useGetArticleQuery,
  useCreateArticleMutation,
  useDeleteArticleMutation,
  useGetArticlesOneQuery,
  useEditArticleMutation,
  useFavoriteAnArticleMutation,
  useDeleteFavoriteAnArticleMutation,
} = articlesApi;
