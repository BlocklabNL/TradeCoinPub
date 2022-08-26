import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const privApi = createApi({
  reducerPath: 'privApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3030/priv/' }),
  tagTypes: ['Priv'],
  endpoints: (build) => ({
    getPriv: build.query({
      query: (id) => `${id}`,
    }),
    getPrivs: build.query({
      query: () => '',
    }),
    addPriv: build.mutation({
      query(body) {
        return {
          url: ``,
          method: 'POST',
          body,
        }
      },
    }),
    updatePriv: build.mutation({
      query(body) {
        return {
          url: ``,
          method: 'PUT',
          body,
        }
      },
    }),
    deletePriv: build.mutation({
      query(id) {
        return {
          url: `${id}`,
          method: 'DELETE',
        }
      },
    }),
  }),
})

export const { useGetPrivQuery, useGetPrivsQuery, useAddPrivMutation, useUpdatePrivMutation, useDeletePrivMutation } = privApi