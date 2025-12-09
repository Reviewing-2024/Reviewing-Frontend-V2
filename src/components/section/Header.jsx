import React from 'react';

import '../../assets/scss/section/_layout.scss'
import '../../assets/scss/section/_header.scss'



const Header = () => {

  return (
    <div id='header' role='banner'>
      <div className="header__content">
        <a className='header-logo' href="/">
          <img className='logo'  src='/img/NavLogo.png' />
        </a>
        <div className='header__content__userbtn'>
          <button className='userbtn-login'>로그인</button>
          <button className='userbtn-register'>회원가입</button>
        </div>
      </div>
    </div>
  );
}

export default Header;
