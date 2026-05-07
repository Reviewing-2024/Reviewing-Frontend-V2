import React, { useState, useEffect } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';

import CourseCard from '../components/component/CourseCard';
import Pagination from '../components/component/Pagination';

import '../asserts/scss/section/_wish.scss'

import { mypage_Sort_Category, mypage_Review_Category } from '../data/mypagedata'
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { FaHeart, FaRegHeart, FaThumbsDown, FaThumbsUp } from "react-icons/fa6";

import { useAuth } from "../context/AuthContext";
import { handleApiError } from '../data/apierror.js'


const Wish = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { sortCategory } = useParams();
  const [courses, setCourses] = useState([]);
  const [courseCount, setCourseCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [current_category, setCurrent_category] = useState('wish');

  const { logout } = useAuth();
  const accessToken = localStorage.getItem("accessToken");
  const page = Number(searchParams.get('page')) || 1;
  const ITEMS_PER_PAGE = 20;

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
        { 
          params: {page: page - 1, size: ITEMS_PER_PAGE},
          headers: { Authorization: accessToken }
        }
      );

      setCourses(response.data.data.content);
      setCourseCount(response.data.data.page.totalElements);
      setTotalPages(response.data.data.page.totalPages);

    } catch (error) {

      handleApiError(error, { logout });
      
    }

  };

  useEffect(() => {

    fetchCourses();

  }, [accessToken, page]);


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
          <FaHeart /> <span>찜한 강의</span><span className='courseCount'>{courseCount}개</span>
        </div>

        <div className='home__item'>
          <div className='item__card'>
            {courses.map(course => (
              <CourseCard course={course} key={course.id} />
            ))}
          </div>
        </div>

      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(p) => {
          const newParams = new URLSearchParams(searchParams);

          newParams.set("page", p);

          setSearchParams(newParams);
        }}
      />
    </div>

  )
}

export default Wish
