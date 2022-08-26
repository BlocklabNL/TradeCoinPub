import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const eventApi = createApi({
  reducerPath: 'eventApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8081/event/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Event'],
  endpoints: (build) => ({
    getResources: build.query({
      query: () => '',
    }),
    getResourcesByParam: build.query({
      query: (params) => {
        return {
          url: '',
          params: params,
        };
      },
    })
  }),
})

export const { useGetResourcesQuery, useGetResourcesByParamQuery } = eventApi