import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import riskmodelReducer from './risk/riskmodelSlice'
import productReducer from './product/productSlice'

import { setupListeners } from '@reduxjs/toolkit/query'
import { authApi } from './auth/authapi'
import { userApi } from './auth/userapi'
import { roleApi } from './auth/roleapi'
import { orgApi } from './auth/orgapi'
import { privApi } from './auth/privapi'
import { vaultApi } from './vault/vaultapi'
import { productApi } from './product/productapi'
import { referenceApi } from './product/referenceapi'
import { eventApi } from './product/eventapi'

import { riskassessApi } from './risk/riskassessapi'
import { dealApi } from './risk/dealapi'
import { riskmodelApi } from './risk/riskmodelapi'

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    riskmodel: riskmodelReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [roleApi.reducerPath]: roleApi.reducer,
    [orgApi.reducerPath]: orgApi.reducer,
    [privApi.reducerPath]: privApi.reducer,
    [vaultApi.reducerPath]: vaultApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [referenceApi.reducerPath]: referenceApi.reducer,
    [eventApi.reducerPath]: eventApi.reducer,
    [riskassessApi.reducerPath]: riskassessApi.reducer,
    [dealApi.reducerPath]: dealApi.reducer,
    [riskmodelApi.reducerPath]: riskmodelApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      eventApi.middleware,
      userApi.middleware,
      roleApi.middleware,
      orgApi.middleware,
      vaultApi.middleware,
      productApi.middleware,
      privApi.middleware,
      referenceApi.middleware,
      riskassessApi.middleware,
      dealApi.middleware,
      riskmodelApi.middleware,
    ),
})

setupListeners(store.dispatch)

export default store