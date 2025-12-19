import React from 'react';
import { Link, useParams } from 'react-router-dom';

import '../assets/scss/section/_main.scss'


import { platforms, categorys } from '../data/platform';
import SearchBar from '../components/component/SearchBar';
import CourseCard from '../components/component/CourseCard';
import Pagination from 'react-js-pagination';

import { course } from '../data/course'

const home = () => {

  const params = useParams()

  const platformTitle = platforms.map(p => p.title);
  const categoryTitle = categorys.map(c => c.title);
  
  let selectedPlatform = 
    params.platform && platformTitle.includes(params.platform)
    ? params.platform 
    : null; 

  const selectedCategory =
    params.category
      ? params.category
      : params.platform && categoryTitle.includes(params.platform)
        ? params.platform
        : null;

  const filteredCourse = course.filter(item => { 
    const platformMatch = selectedPlatform 
    ? item.platform === selectedPlatform 
    : true; 
    
    const categoryMatch = selectedCategory 
    ? item.category === selectedCategory 
    : true; 
    
    return platformMatch && categoryMatch; 
  });


  return (
    <div id='home' role='home'>
      <div className='home__banner'>
        <img className='banner' src="/img/banner.png" alt="banner" />
      </div>
      <div className='search-bar'>
        <SearchBar />
        <button className='recommand-btn'>✨ 강의 추천받기</button>
      </div>
      <div className='home__platform'>
        <ul className='platform_container'>
          <li>
            <Link
              to={'/'}
              className={!selectedPlatform ? 'active' : ''}
            >
              전체 플랫폼
            </Link>
          </li>
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
          <li>
            <Link
              to={selectedPlatform ? `/${selectedPlatform}` : `/`}
              className={!selectedCategory ? 'active' : ''}
            >
              전체 카테고리
            </Link>
          </li>
          {categorys.map((category, key) => (
            <li key={key}>
              <Link
                to={ selectedPlatform ? `/${selectedPlatform}${category.src}` : `${category.src}`}
                className={params.category === category.title ? 'active' : (params.platform === category.title ? 'active' : '')}
              >
                {category.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className='home__item'>
        <div className='item__card'>

          {filteredCourse.map(course => (
            <CourseCard  course={course} key={course.id}/>
          ))}

        </div>
        {/* <Pagination /> */}
      </div>
    </div>
  )
}

export default home