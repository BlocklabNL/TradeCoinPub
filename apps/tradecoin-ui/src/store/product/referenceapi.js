import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const referenceApi = createApi({
  reducerPath: 'referenceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8081/reference/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['reference'],
  endpoints: (build) => ({
    getCommodities: build.query({
      query: () => 'commodity',
    }),
    getCommodity: build.query({
      query: (name) => `commodity/${name}`,
    }),
    addCommodity: build.mutation({
      query(body) {
        return {
          url: `commodity`,
          method: 'POST',
          body,
        }
      },
    }),
    updateCommodity: build.mutation({
      query(body) {
        return {
          url: `commodity`,
          method: 'PUT',
          body,
        }
      },
    }),
    deleteCommodity: build.mutation({
      query(id) {
        return {
          url: `commodity/${id}`,
          method: 'DELETE',
        }
      },
    }),
    getDocTypes: build.query({
      query: () => 'doctype',
    }),
    getDocType: build.query({
      query: (id) => `doctype/${id}`,
    }),
    addDocType: build.mutation({
      query(body) {
        return {
          url: `doctype`,
          method: 'POST',
          body,
        }
      },
    }),
    updateDocType: build.mutation({
      query(body) {
        return {
          url: `doctype`,
          method: 'PUT',
          body,
        }
      },
    }),
    deleteDocType: build.mutation({
      query(id) {
        return {
          url: `doctype/${id}`,
          method: 'DELETE',
        }
      },
    }),
    //List of Units
    getUnits: build.query({
      query: () => 'unit',
    }),
    // Get specific Unit
    getUnit: build.query({
      query: (id) => `unit/${id}`,
    }),
    addUnit: build.mutation({
      query(body) {
        return {  
          url: `unit`,
          method: 'POST',
          body,
        }
      },
    }),
    updateUnit: build.mutation({
      query(body) {
        return {
          url: `unit`,
          method: 'PUT',
          body,
        }
      },
    }),
    deleteUnit: build.mutation({
      query(id) {
        return {
          url: `unit/${id}`,
          method: 'DELETE',
        }
      },
    }),
    //List of transform
    GetTransforms: build.query({
      query: () => 'transformation',
    }),
    // Get specific transform
    getTranformation: build.query({
      query: (id) => `transformation/${id}`,
    }),
    addTransformation: build.mutation({
      query(body) {
          return {  
          url: `transformation`,
          method: 'POST',
          body,
        }
      },
    }),
    updateTransformation: build.mutation({
      query(body) {
        return {
          url: `transformation`,
          method: 'PUT',
          body,
        }
      },
    }),
    deleteTransformation: build.mutation({
      query(id) {
        return {
          url: `transformation/${id}`,
          method: 'DELETE',
        }
      },
    })
  }),
})

export const {
  // Commodity
  useGetCommoditiesQuery,
  useGetCommodityQuery,
  useAddCommodityMutation,
  useUpdateCommodityMutation,
  useDeleteCommodityMutation,

  // DocTypes
  useGetDocTypesQuery,
  useGetDocTypeQuery,
  useAddDocTypeMutation,
  useDeleteDocTypeMutation,
  useUpdateDocTypeMutation,

  // Transformations
  useUpdateTransformationMutation,
  useAddTransformationMutation,
  useGetTranformationQuery,
  useDeleteTransformationMutation,
  useGetTransformsQuery,

  //Units
  useAddUnitMutation,
  useDeleteUnitMutation,
  useGetUnitQuery,
  useGetUnitsQuery,
  useUpdateUnitMutation



} = referenceApi