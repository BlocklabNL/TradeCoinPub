import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3030/user/' }),
  tagTypes: ['Users'],
  endpoints: (build) => ({
    getUsers: build.query({
      query: () => '',
    }),
    getUser: build.query({
      query: (id) => `${id}`,
    }),
    getUserByBAddress: build.query({
      query: (baddress) => `${baddress}`,
    }),
    updateUser: build.mutation({
      query(body) {
        return {
          url: ``,
          method: 'PUT',
          body,
        }
      },
    }),
    deleteUser: build.mutation({
      query(id) {
        return {
          url: `${id}`,
          method: 'DELETE',
        }
      },
    }),
  }),
})

export const { useGetUserByBAddressQuery, useGetUserQuery, useGetUsersQuery, useUpdateUserMutation, useDeleteUserMutation } = userApi