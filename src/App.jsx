import React from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/section/Header';
import Main from './components/section/MainSection'
import Footer from './components/section/Footer';

import Home from './pages/Home';
import Search from './pages/Search';
import Detail from './pages/Detail';

const App = () => {
    return (
        <BrowserRouter>
            <Header />
              <Main>
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/:platform' element={<Home />} />
                  <Route path='/:category' element={<Home />} />
                  <Route path='/:platform/:category' element={<Home />} />
                  <Route path='/courses/:slug' element={<Detail />} />
                  <Route path='/search/:searchKeyword' element={<Search />} />
                </Routes>
              </Main>
            <Footer />
        </BrowserRouter >
    )
}

export default App
