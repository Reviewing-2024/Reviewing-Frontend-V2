import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import { mypage_Sort_Category, mypage_Review_Category } from '../data/mypagedata'
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { FaHeart, FaRegHeart, FaThumbsDown, FaThumbsUp } from "react-icons/fa6";

import '../asserts/scss/section/_wish.scss'

import { useAuth } from "../context/AuthContext";
import { handleApiError } from '../data/apierror.js'

import CourseCard from '../components/component/CourseCard';
import Pagination from '../components/component/Pagination';

const Wish = () => {

  const { sortCategory } = useParams();
  const [courses, setCourses] = useState([]);
  const [courseCount, setCourseCount] = useState([]);
  const [current_category, setCurrent_category] = useState('wish');

  const { logout } = useAuth();
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (sortCategory) {
      setCurrent_category(sortCategory);
    } else {
      setCurrent_category('wish');
    }
  }, [sortCategory]);

  //강의 조회
  const fetchCourses = async () => {

    try {

      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/members/me/wishes`, 
        {headers: { Authorization: accessToken }}
      );

      setCourses(response.data.data.content);
      setCourseCount(response.data.data.page.totalElements);

    } catch (error) {
      handleApiError(error,{logout});
    }

  };

  useEffect(() => {

    fetchCourses();

  }, [accessToken]);


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
            <FaHeart /> <span>찜한 강의</span><span>{courseCount}개</span>
          </div>
      
      <div className='home__item'>
        <div className='item__card'>
          {courses.map(course => (
            <CourseCard  course={course} key={course.id}/>
          ))}
        </div>
      </div>
      
      </div>
      </div>

  )
}

export default Wish
