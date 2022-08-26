import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const riskmodelApi = createApi({
  reducerPath: 'riskmodelApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8082/riskmodel/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['RiskModel'],
  endpoints: (build) => ({
    getRiskModels: build.query({
      query: () => '',
    }),
    getRiskModel: build.query({
      query: (id) => `${id}`,
    }),
    addRiskModel: build.mutation({
      query(body) {
        return {
          url: ``,
          method: 'POST',
          body,
        }
      },
    }),
    updateRiskModel: build.mutation({
      query(body) {
        return {
          url: ``,
          method: 'PUT',
          body,
        }
      },
    }),
    deleteRiskModel: build.mutation({
      query(id) {
        return {
          url: `${id}`,
          method: 'DELETE',
        }
      },
    }),
  }),
})

export const {useGetRiskModelQuery, useGetRiskModelsQuery, useAddRiskModelMutation, useUpdateRiskModelMutation, useDeleteRiskModelMutation } = riskmodelApi