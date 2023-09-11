import { configureStore } from "@reduxjs/toolkit"
import booksReducer from "./slices/books"
import bookReducer from "./slices/book"
import settingsReducer from "./slices/loading"

export const store = configureStore({
  reducer: {
    books: booksReducer,
    book: bookReducer,
    settings: settingsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
