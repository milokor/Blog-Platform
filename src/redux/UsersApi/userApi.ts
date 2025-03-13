import type {
  ILoginInfo,
  ILoginUser,
  IProfileEditor,
  IProfileInfo,
  IRegisterGetInfo,
  IRegisterInfo,
} from '../../types/type';
import { baseApi } from '../baseApi';
export const userApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    registerUser: create.mutation<IRegisterGetInfo, IRegisterInfo>({
      query: (userdata) => ({
        url: '/users',
        method: 'POST',
        body: userdata,
      }),
      invalidatesTags: ['users'],
    }),
    loginUser: create.mutation<ILoginUser, ILoginInfo>({
      query: (userdata) => ({
        method: 'POST',
        url: '/users/login',
        body: userdata,
      }),
      invalidatesTags: ['users'],
    }),
    getProfile: create.query<IProfileInfo, { username: string }>({
      query: ({ username }) => ({
        url: `/profiles/${username}`,
      }),
      providesTags: ['users'],
    }),
    getUserData: create.query<ILoginUser, { token: string }>({
      query: (userdata) => ({
        url: `/user`,
        headers: {
          Authorization: `Token ${userdata}`,
        },
      }),
      providesTags: ['users'],
    }),
    updateProfile: create.mutation<void, IProfileEditor>({
      query: (userdata) => ({
        method: 'PUT',
        url: '/user',
        body: userdata,
      }),
      invalidatesTags: ['users'],
    }),
  }),

  overrideExisting: true,
});
export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetProfileQuery,
  useGetUserDataQuery,
  useUpdateProfileMutation,
} = userApi;
