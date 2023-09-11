import { createSlice } from "@reduxjs/toolkit"

const settingsSlice = createSlice({
  name: "loading",
  initialState: {
    loading: true,
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload
    },
  },
})

export const { setLoading } = settingsSlice.actions

export default settingsSlice.reducer
