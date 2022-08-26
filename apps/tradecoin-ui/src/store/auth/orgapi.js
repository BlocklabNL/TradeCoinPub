import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const orgApi = createApi({
  reducerPath: 'orgApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3030/org/' }),
  tagTypes: ['Org'],
  endpoints: (build) => ({
    getOrg: build.query({
      query: (id) => `${id}`,
    }),
    getOrgs: build.query({
      query: () => '',
    }),
    addOrg: build.mutation({
      query(body) {
        return {
          url: ``,
          method: 'POST',
          body,
        }
      },
    }),
    updateOrg: build.mutation({
      query(body) {
        return {
          url: ``,
          method: 'PUT',
          body,
        }
      },
    }),
    deleteOrg: build.mutation({
      query(id) {
        return {
          url: `${id}`,
          method: 'DELETE',
        }
      },
    }),
  }),
})

export const { useGetOrgQuery, useGetOrgsQuery, useAddOrgMutation, useUpdateOrgMutation, useDeleteOrgMutation } = orgApi