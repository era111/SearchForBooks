import { createSlice } from "@reduxjs/toolkit"

interface BookInfo {
  id: string
  volumeInfo: {
    imageLinks: { smallThumbnail: string } | undefined
    title: string | undefined
    authors: string[] | undefined
    categories: string
  }
}

const booksSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    total: 0,
  },
  reducers: {
    addBooks(state, action) {
      state.books = state.books.concat(action.payload) || []
    },
    refreshBooks(state) {
      state.books = []      
    },
    setTotalItems(state, action) {
      state.total = action.payload
    },
  },
})

export const { addBooks, setTotalItems, refreshBooks } = booksSlice.actions

export default booksSlice.reducer
