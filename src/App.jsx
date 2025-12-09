import React from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import Header from './layouts/header';

import Home from './pages/home'

const App = () => {
    return (
        <>
          <Header />
            <Routes>
              <Route path='/' element={<Home />} />
            </Routes>
        </>
    )
}

export default App
