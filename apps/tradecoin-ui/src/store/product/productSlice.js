import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct: (state, action) => {
      console.log(action)
      state.products = [...state.products, action.payload]
    },
    removeProduct: (state, action) => {
      console.log(action)
      state.products = state.products.filter(data => data.ID !== action.payload);
    },
  },
})

// Action creators are generated for each case reducer function
export const { setProduct, removeProduct } = productSlice.actions

export default productSlice.reducer