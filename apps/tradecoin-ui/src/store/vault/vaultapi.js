import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const vaultApi = createApi({
  reducerPath: 'vaultApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Vault'],
  endpoints: (build) => ({
    getResources: build.query({
      query: () => 'assets/list',
    }),
    downloadDocument: build.query({
      query: (dochash) => `assets/${dochash}`,
    }),
    uploadFile: build.mutation({
      query(body) {
        return {
          url: `assets/upload`,
          method: 'POST',
          body,
        }
      },
    }),
    getAuthInfo: build.query({
      query: (assetid) => `auth/${assetid}`,
    }),
    grantAccess: build.mutation({
      query(input) {
        return {
          url: `auth/grant/${input.userid}/${input.assethash}`,
          method: 'PUT',
        }
      },
    }),
    liftAccess: build.mutation({
      query(input) {
        return {
          url: `auth/lift/${input.userid}/${input.assethash}`,
          method: 'PUT',
        }
      },
    }),
  }),

})

export const { useDownloadDocumentQuery,useGrantAccessMutation,useLiftAccessMutation,useGetAuthInfoQuery,useGetResourcesQuery, useUploadFileMutation } = vaultApi