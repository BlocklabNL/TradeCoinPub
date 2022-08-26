import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const roleApi = createApi({
  reducerPath: 'roleApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3030/role/' }),
  tagTypes: ['Role'],
  endpoints: (build) => ({
    getRole: build.query({
      query: (id) => `${id}`,
    }),
    getRoles: build.query({
      query: () => '',
    }),
    addRole: build.mutation({
      query(body) {
        return {
          url: ``,
          method: 'POST',
          body,
        }
      },
    }),
    updateRole: build.mutation({
      query(body) {
        return {
          url: ``,
          method: 'PUT',
          body,
        }
      },
    }),
    deleteRole: build.mutation({
      query(id) {
        return {
          url: `${id}`,
          method: 'DELETE',
        }
      },
    }),
  }),
})

export const {useGetRoleQuery, useGetRolesQuery, useAddRoleMutation, useUpdateRoleMutation, useDeleteRoleMutation } = roleApi