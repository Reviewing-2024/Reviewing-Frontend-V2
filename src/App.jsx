import React from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/section/Header';
import Main from './components/section/MainSection'
import Footer from './components/section/Footer';

import Terms_and_conditions from './pages/policies/terms-and-conditions';
import Privacy_policy from './pages/policies/privacy-policy';

import Home from './pages/home';
import Search from './pages/Search';
import Detail from './pages/Detail';
import Mypage from './pages/Mypage';
import Wish from './pages/Wish';
import Profile from './pages/Profile';
import LoginRedirect from './pages/LoginRedirect';
import Admin from './pages/Admin';

const App = () => {
    return (
        <BrowserRouter>
            <Header />
              <Main>
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/:platform' element={<Home />} />
                  <Route path='/:platform/:category' element={<Home />} />
                  <Route path='/courses/:platform/:slug' element={<Detail />} />
                  <Route path='/mypage/review' element={<Mypage />} />
                  <Route path='/mypage/wish' element={<Wish />} />
                  <Route path='/mypage/profile' element={<Profile />} />
                  <Route path='/search' element={<Search />} />
                  <Route path="/login/redirect" element={<LoginRedirect />} />
                  <Route path='/admin' element={<Admin />} />
                  <Route path='/policies/terms-and-conditions' element={<Terms_and_conditions />} />
                  <Route path='/policies/privacy-policy' element={<Privacy_policy />} />
                </Routes>
              </Main>
            <Footer />
        </BrowserRouter >
    )
}

export default App
