import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: '',
  userid: '',
  userbaddress: '',
  roles: [],
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      console.log(action)
      state.token = action.payload.token
      state.userid = action.payload.userid
      state.userbaddress = action.payload.userbaddress
      state.roles = action.payload.roles
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAuth } = authSlice.actions

export default authSlice.reducer