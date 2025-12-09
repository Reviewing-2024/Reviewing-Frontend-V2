import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

import '../assets/header.css'

import { IoIosSearch } from "react-icons/io";

// import KakaoLogin from './kakao/KakaoLogin';


const Header = () => {

    // const [searchKeyword, setSearchKeyword] = useState('');
    // const navigate = useNavigate();

    // const handleSearch = () => {
    //     if (searchKeyword) {
    //         navigate(`/search/${searchKeyword}`);
    //         setSearchKeyword('');
    //     }
    // };

  return (
    <div className='header2'>
      <div className="header__content">
        <a className='header__logo' href="/">
          <img className='logo' src='/img/Logo1.png'></img>
        </a>
      </div>
    </div>
  );
}

export default Header;
