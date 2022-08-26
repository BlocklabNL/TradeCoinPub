import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const dealApi = createApi({
  reducerPath: 'dealApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8082/deal/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Deal'],
  endpoints: (build) => ({
    getDeals: build.query({
      query: () => '',
    }),
    getDeal: build.query({
      query: (id) => `${id}`,
    }),
    addDeal: build.mutation({
      query(body) {
        return {
          url: ``,
          method: 'POST',
          body,
        }
      },
    }),
    updateDeal: build.mutation({
      query(body) {
        return {
          url: ``,
          method: 'PUT',
          body,
        }
      },
    }),
    deleteDeal: build.mutation({
      query(id) {
        return {
          url: `${id}`,
          method: 'DELETE',
        }
      },
    }),
  }),
})

export const {useGetDealQuery, useGetDealsQuery, useAddDealMutation, useUpdateDealMutation, useDeleteDealMutation } = dealApi