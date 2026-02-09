import React from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/section/Header';
import Main from './components/section/MainSection'
import Footer from './components/section/Footer';

import Home from './pages/home';
import Search from './pages/Search';
import Detail from './pages/Detail';
import Mypage from './pages/Mypage';
import Wish from './pages/Wish';
import Profile from './pages/Profile';

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
                  <Route path='/mypage/review' element={<Mypage />} />
                  <Route path='/mypage/wish' element={<Wish />} />
                  <Route path='/mypage/profile' element={<Profile />} />
                  <Route path='/search/:searchKeyword' element={<Search />} />
                </Routes>
              </Main>
            <Footer />
        </BrowserRouter >
    )
}

export default App
