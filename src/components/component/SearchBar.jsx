import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import '../../asserts/scss/section/_main.scss'

import { IoIosSearch } from 'react-icons/io';

const Search = () => {
  const [searchParams] = useSearchParams();
  const [searchKeyword, setSearchKeyword] = useState(searchParams.get("s") ?? "");
  const navigate = useNavigate();


  const handleSearch = (e) => {
    console.log(searchKeyword)
    if (!searchKeyword) {
      alert('검색어를 입력해주세요.')
      return;
    }
    navigate(`/search?s=${searchKeyword}`);
  };

  return (
    <div id='search'>
      <div className='search-Input'>
        <img className='search-icon' src="/img/Logo.png" alt="search-icon" />
        <input
          className='searchinput'
          type='search'
          placeholder='강의 제목, 강사, 플랫폼을 검색해보세요'
          value={searchKeyword}
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