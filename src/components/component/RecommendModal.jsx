import React, { useState, useEffect } from 'react'
import axios from 'axios';

import '../../asserts/scss/component/_RecommendModal.scss'

import CourseCard from './CourseCard'
import { handleApiError } from '../../data/apierror';
import { useAuth } from '../../context/AuthContext';


const RecommendModal = ({ onClose, searchKeyword }) => {

  const [courses, setCourses] = useState([]);
  const [intro, setIntro] = useState();
  const [loading, setLoading] = useState(false);

  const { logout } = useAuth();

  const fetchCourses = async () => {

    setLoading(true);

    try {

      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/search/recommend`,
        { params: { query: searchKeyword } }
      );

      setCourses(response.data.data.recommendations);
      setIntro(response.data.data.intro);

    } catch (error) {

      handleApiError(error, { logout })

    } finally {

      setLoading(false);
      
    }
  };

  useEffect(() => {

    fetchCourses();

  }, [searchKeyword]);



  return (
    <div className='recommend_modal_overlay' onClick={onClose}>
      <div className='recommend_modal'
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}>
        <div className='recommend_modal-countainer'>
          <h2>강의 추천 결과</h2>
          <span>입력:</span> <span className='recommend_modal-searchKeyword'> {searchKeyword}</span>
          
          <div className='recommend_modal-intro'>
            {intro}
          </div>

        </div>
        {courses.length === 0 && !loading && (
          <p className="no-result">추천 강의가 없습니다.</p>
        )}
        {loading && (
          <div>로딩중..</div>
        )}
        <div className='item__card'>
          {courses.map(course => (
            <CourseCard course={course} key={course.id} />

          ))}
        </div>
        
      </div>

    </div>
  )
}

export default RecommendModal
