import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

import '../assets/scss/section/_main.scss'

import { IoIosSearch } from 'react-icons/io';

const home = () => {

  const [searchKeyword, setSearchKeyword] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchKeyword) {
            navigate(`/search/${searchKeyword}`);
            setSearchKeyword('');
        }
    };

  return (
    <div id='home' role='home'>
      <div className='home__banner'>
        <img className='banner' src="/img/banner.png" alt="banner" />
      </div>
      <div className='search-bar'>
          <div className='search-Input'>
            <img className='search-icon' src="/img/Logo.png" alt="search-icon" />
            <input 
                type='search' 
                id='searchInput' 
                placeholder='강의 제목, 강사, 플랫폼을 검색해보세요' 
                autoComplete='off' 
                className='searchinput' 
                onChange={e => setSearchKeyword(e.target.value)}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                      handleSearch();
                    }
                }}
              />
              <button className='search-btn' onClick={handleSearch}><IoIosSearch /></button>
            </div>
            <button className='recommand-btn'>✨ 강의 추천받기</button>
        </div> 
    </div>
  )
}

export default home