import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3030/auth/' }),
  tagTypes: ['Auth'],
  endpoints: (build) => ({
    addUser: build.mutation({
        query(body) {
          return {
            url: `register`,
            method: 'POST',
            body,
          }
        },
        invalidatesTags: [{ type: 'Auth', id: 'LIST' }],
      }),
      loginUser: build.mutation({
        query(body) {
          return {
            url: `login`,
            method: 'POST',
            body,
          }
        },
        invalidatesTags: [{ type: 'Auth', id: 'LIST' }],
      }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAddUserMutation, useLoginUserMutation } = authApi