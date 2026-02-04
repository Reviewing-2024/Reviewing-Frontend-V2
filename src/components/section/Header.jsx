import React, { useState } from 'react';

import '../../assets/scss/section/_layout.scss'
import '../../assets/scss/section/_header.scss'

import Login from './Login';



const Header = () => {
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
          <button className='userbtn-login' onClick={() => setLogintogle(!logintogle)}>로그인</button>
        </div>
      </div>
      { logintogle ? < Login onClose={closeLoginForm} /> : ''}
    </div>
  );
}

export default Header;
