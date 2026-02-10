import React, { useState } from 'react';

import '../../assets/scss/section/_layout.scss'
import '../../assets/scss/section/_header.scss'

import Login from './Login';
import { useAuth } from '../../context/AuthContext';



const Header = () => {
  const { isLogin, logout } = useAuth();
  const [logintogle, setLogintogle] = useState(false)

  const closeLoginForm = () => {
    setLogintogle(false);
  };


  return (
    <div id='header' role='banner'>
      <div className="header__content">
        <a className='header-logo' href="/">
          <img className='logo'  src='/img/NavLogo.png' />
        </a>
        <div className='header__content__userbtn'>
          { isLogin ? (
            <button className='userbtn-login' onClick={logout}>로그아웃</button>
          ) : (
            <button className='userbtn-login' onClick={() => setLogintogle(true)}>로그인</button>
          )}
        </div>
      </div>
      {!isLogin && logintogle && <Login onClose={() => setLogintogle(false)} />}
    </div>
  );
}

export default Header;
