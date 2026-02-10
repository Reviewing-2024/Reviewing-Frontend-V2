import React, { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams, useNavigate } from 'react-router-dom';

import '../assets/scss/section/_main.scss'


import { platforms, categorys } from '../data/platform';
import SearchBar from '../components/component/SearchBar';
import CourseCard from '../components/component/CourseCard';
import Pagination from '../components/component/Pagination';

import { course } from '../data/course'


const Home = () => {

  const navigate = useNavigate();
  const params = useParams()
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;

  const [courses, setCourses] = useState([]);


  //플랫폼 및 카테고리 헤더 선택 영역
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

  //강의 필터링
  const filteredCourse = course.filter(item => { 
    const platformMatch = selectedPlatform 
    ? item.platform === selectedPlatform 
    : true; 
    
    const categoryMatch = selectedCategory 
    ? item.category === selectedCategory 
    : true; 
    
    return platformMatch && categoryMatch; 
  });


// 페이지네이션 설정 

const ITEMS_PER_PAGE = 1;

useEffect(() => {
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = page * ITEMS_PER_PAGE;

  setCourses(filteredCourse.slice(start, end));
}, [page, selectedPlatform, selectedCategory]);


  return (
    <div id='home' role='home'>
      <div className='home__banner'>
        <img className='banner' src="/img/banner.png" alt="banner" />
      </div>
      <div className='search-bar'>
        <SearchBar />
        <button className='recommand-btn' onClick={() => navigate('/mypage/review')}>✨ 강의 추천받기</button>
      </div>
      <nav className='home__platform'>
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
      </nav>
      <div className='home__item'>
        <div className='item__card'>
          {courses.map(course => (
            <CourseCard  course={course} key={course.id}/>
          ))}
        </div>
         <Pagination
            currentPage={page}
            totalItems={filteredCourse.length}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={(p) =>
              setSearchParams({ page: p })
            }
          />
      </div>
    </div>
  )
}

export default Home