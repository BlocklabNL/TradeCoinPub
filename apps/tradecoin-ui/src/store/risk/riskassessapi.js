import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const riskassessApi = createApi({
  reducerPath: 'riskassessApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8082/riskassess/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['RiskAssess'],
  endpoints: (build) => ({
    getRiskAssessments: build.query({
      query: () => '',
    }),
    getRiskAssessment: build.query({
      query: (id) => `${id}`,
    }),
    addRiskAssessment: build.mutation({
      query(body) {
        return {
          url: ``,
          method: 'POST',
          body,
        }
      },
    }),
    updateRiskAssessment: build.mutation({
      query(body) {
        return {
          url: ``,
          method: 'PUT',
          body,
        }
      },
    }),
    deleteRiskAssessment: build.mutation({
      query(id) {
        return {
          url: `${id}`,
          method: 'DELETE',
        }
      },
    }),
  }),
})

export const {useGetRiskAssessmentQuery, useGetRiskAssessmentsQuery, useAddRiskAssessmentMutation, useUpdateRiskAssessmentMutation, useDeleteRiskAssessmentMutation } = riskassessApi