import React from 'react';
import { Link, useParams } from 'react-router-dom';

import '../assets/scss/section/_main.scss'


import { platforms } from '../data/platform';
import { category } from '../data/platform';
import SearchBar from '../components/component/SearchBar';
import CourseItem from '../components/component/CourseItem';

import { course } from '../data/course'

const home = () => {

  const params = useParams()



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
      <div className='search-bar'>
        <SearchBar />
        <button className='recommand-btn'>✨ 강의 추천받기</button>
      </div>
      <div className='home__platform'>
        <ul className='platform_container'>
          {platforms.map((platform, key) => (
            <li key={key}>
              <Link
                to={platform.src}
                className={params.platform === platform.title ? 'active' : ''}
              >
                {platform.title}
              </Link>
            </li>
          ))}
        </ul>
        <ul className='category_container'>
          {category.map((category, key) => (
            <li key={key}>
              <Link
                to={category.src}
                className={params.category === category.title ? 'active' : ''}
              >
                {category.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className='home__item'>
        <div className='item__card'>

          {course.map(course => (
            <CourseItem  course={course} key={course.id}/>
          ))}

        </div>
      </div>
    </div>
  )
}

export default home