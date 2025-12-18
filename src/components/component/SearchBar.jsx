import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import '../../assets/scss/section/_main.scss'

import { IoIosSearch } from 'react-icons/io';

const Search = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchKeyword) {
      navigate(`/search/${searchKeyword}`);
      setSearchKeyword('');
    }
  };

  return (
    <div id='search'>
      <div className='search-Input'>
        <img className='search-icon' src="/img/Logo.png" alt="search-icon" />
        <input
          className='searchinput'
          type='search'
          placeholder='강의 제목, 강사, 플랫폼을 검색해보세요'
          onChange={e => setSearchKeyword(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        <button className='search-btn' onClick={handleSearch}><IoIosSearch /></button>
      </div>
    </div>
  )
}

export default Search