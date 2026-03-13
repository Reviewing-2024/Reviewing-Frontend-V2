import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';

import { mypage_Sort_Category, mypage_Review_Category } from '../data/mypagedata'
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { FaHeart, FaRegHeart, FaThumbsDown, FaThumbsUp } from "react-icons/fa6";

import '../asserts/scss/section/_wish.scss'

import { course } from '../data/course.js';
import CourseCard from '../components/component/CourseCard';
import Pagination from '../components/component/Pagination';

const Wish = () => {

  const { sortCategory } = useParams();

  const [current_category, setCurrent_category] = useState('wish');



  useEffect(() => {
    if (sortCategory) {
      setCurrent_category(sortCategory);
    } else {
      setCurrent_category('wish');
    }
  }, [sortCategory]);


  return (
    <div id='wish' role='wish'>
      <p className='mypage-title'>마이페이지</p>
      <nav className='sort-category'>
        <ul>
          {mypage_Sort_Category.map((categoryItem, key) => (
            <li key={key}>
              <Link
                to={`/mypage${categoryItem.src}`}
                className={current_category === categoryItem.slug ? 'active' : ''}
              >
                {categoryItem.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div>
          <div className='wishlist_count'>
            <FaHeart /> <span>찜한 강의</span><span></span>
          </div>
      
      <div className='home__item'>
        <div className='item__card'>
          {course.map(course => (
            <CourseCard  course={course} key={course.id}/>
          ))}
        </div>
      </div>
      
      </div>
      </div>

  )
}

export default Wish
