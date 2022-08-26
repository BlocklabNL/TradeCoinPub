import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8081/product/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Product'],
  endpoints: (build) => ({
    getResources: build.query({
      query: () => '',
    }),
    getResource: build.query({
      query: (id) => `${id}`,
    }),
    addResource: build.mutation({
      query(body) {
        return {
          url: ``,
          method: 'POST',
          body,
        }
      },
    }),
    updateResource: build.mutation({
      query(body) {
        return {
          url: ``,
          method: 'PUT',
          body,
        }
      },
    }),
    deleteResource: build.mutation({
      query(id) {
        return {
          url: `${id}`,
          method: 'DELETE',
        }
      },
    }),
    getDocuments: build.query({
      query: (hash) => `document/${hash}`,
    }),
    getEvents: build.query({
      query: (id) => `${id}/event`,
    }),
    addProductEvent: build.mutation({
      query(body) {
        return {
          url: `${body.productid}/event`,
          method: 'POST',
          body: body.event,
        }
      },
    }),
  }),
})

export const { useAddProductEventMutation, useGetDocumentsQuery, useGetResourceQuery, useGetResourcesQuery, useAddResourceMutation, useUpdateResourceMutation, useDeleteResourceMutation, useGetEventsQuery } = productApi