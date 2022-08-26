import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  riskmodel: null
}

export const riskmodelSlice = createSlice({
  name: 'riskmodel',
  initialState,
  reducers: {
    updateRiskModel: (state, action) => {
      console.log(action)
      state.riskmodel = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateRiskModel } = riskmodelSlice.actions

export default riskmodelSlice.reducer