import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import '../../asserts/scss/section/_main.scss'

import { IoIosSearch } from 'react-icons/io';

import RecommendModal from '../component/RecommendModal'

const Search = ( ) => {
  const [searchParams] = useSearchParams();
  const [searchKeyword, setSearchKeyword] = useState(searchParams.get("s") ?? "");
  const [recommend_modal, setRecommend_modal] = useState(false);
  const navigate = useNavigate();


  //검색 페이지 이동
  const handleSearch = (e) => {
    if (!searchKeyword) {
      alert('검색어를 입력해주세요.')
      return;
    }
    navigate(`/search?s=${searchKeyword}`);
  };

  //강의 추천 모달 오픈
  const handelRecommendModal = () => {
    if (!searchKeyword) {
      alert('검색어를 입력해주세요.')
      return;
    }
    else {
      setRecommend_modal(true)
    }
  }


  return (
    <div id='search'>
      <div className='search-bar'>
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
      <button className='recommand-btn' onClick={handelRecommendModal} >
        ✨ 강의 추천받기
      </button>
      {recommend_modal && (
              <RecommendModal onClose={() => setRecommend_modal(false)} searchKeyword={searchKeyword}  />
            )}
    </div>
    
  )
}

export default Search