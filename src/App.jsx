import React from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/section/Header';
import Main from './components/section/MainSection'
import Footer from './components/section/Footer';

import Home from './pages/home'

const App = () => {
    return (
        <BrowserRouter>
            <Header />
              <Main>
                <Routes>
                  <Route path='/' element={<Home />} />
                </Routes>
              </Main>
            <Footer />
        </BrowserRouter >
    )
}

export default App
