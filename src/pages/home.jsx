import React from 'react'

import '../assets/scss/section/_main.scss'

const home = () => {
  return (
    <div id='home' role='home'>
      <div className='home__banner'>
        <img className='banner' src="/img/banner.png" alt="banner" />
          <input 
              type='search' 
              id='searchInput' 
              placeholder='검색어를 입력해주세요.' 
              autoComplete='off' 
              className='searchinput' 
              onChange={e => setSearchKeyword(e.target.value)}
              onKeyDown={e => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
              }}
            />
      </div>
    </div>
  )
}

export default home