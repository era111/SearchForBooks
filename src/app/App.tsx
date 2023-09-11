import React from 'react';

import BookPage from '../pages/bookPage';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Route, Routes } from 'react-router-dom';
import MainPage from '../pages/mainPage';

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/SearchForBooks" element={<MainPage />} />
        <Route path="/SearchForBooks/:id" element={<BookPage />} />
      </Routes>
    </Provider>
  )
}

export default App;
