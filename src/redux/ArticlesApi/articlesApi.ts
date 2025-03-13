import type {
  ArticleGet,
  articlesResponse,
  ICreateApiArticle,
  IUpdateArticle,
} from '../../types/type';
import { baseApi } from '../baseApi';
export const articlesApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    getArticles: create.query<articlesResponse, { mainPage: number; pageSize: number }>({
      query: ({ mainPage, pageSize }) => ({
        url: `/articles?limit=${pageSize}&offset=${mainPage}`,
      }),
      providesTags: ['article'],
    }),

    getArticle: create.query<ArticleGet, { title: string | undefined }>({
      query: ({ title }) => ({
        url: `/articles/${title}`,
      }),
      providesTags: ['article'],
    }),
    createArticle: create.mutation<void, ICreateApiArticle>({
      query: (userdata) => ({
        method: 'POST',
        url: '/articles',
        body: userdata,
      }),
      invalidatesTags: ['article'],
    }),
    deleteArticle: create.mutation<void, { slug: string | undefined }>({
      query: ({ slug }) => ({
        method: 'DELETE',
        url: `/articles/${slug} `,
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
      }),
      invalidatesTags: ['article'],
    }),
    favoriteAnArticle: create.mutation<void, { slug: string | undefined }>({
      query: ({ slug }) => ({
        method: 'Post',
        url: `/articles/${slug}/favorite`,
      }),
      invalidatesTags: ['article'],
    }),
    deleteFavoriteAnArticle: create.mutation<void, { slug: string | undefined }>({
      query: ({ slug }) => ({
        method: 'Delete',
        url: `/articles/${slug}/favorite`,
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
