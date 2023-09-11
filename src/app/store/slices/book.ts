import { createSlice } from "@reduxjs/toolkit"

const bookSlice = createSlice({
  name: "book",
  initialState: {
    books: {},
  },
  reducers: {
    addBook(state, action) {
      state.books = action.payload
    },
  },
})

export const { addBook } = bookSlice.actions

export default bookSlice.reducer
