import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import '../asserts/scss/section/_admin.scss'

import { admin_sort_Category } from '../data/mypagedata'

const Admin = () => {
  const { sortCategory } = useParams();
  const accessToken = localStorage.getItem("accessToken");

  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //혹시 모를때 대비해서 키테고리 선택 자동으로 골라주기
  const current_category = sortCategory || "PENDING";


  //요청들어온 리뷰 조회
  useEffect(() => {

    const fetchResponse = async () => {

      try {
        setError(null);
        setLoading(true);

        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/reviews`, {
          params: {
            state: current_category,
            page: 0,
            size: 10,
          },
          headers: {
            Authorization: accessToken,
          },
        }
      );

        setResponse(response.data.data.reviews.content);

      } catch (error) {
        console.error("강의 불러오기 실패:", error);
      }

      setLoading(false);
      
    };

    fetchResponse();
  }, [sortCategory]);

  if (error) return <div>에러가 발생했습니다</div>;


  if (!response) return <div className='user_review_container'>리뷰없음</div>;

  return (
    <div id='admin' role='admin'>
      <p className='admin-title'>리뷰 관리</p>
      <nav className='admin-sort-category'>
        <ul className={`tab-${current_category}`}>
          {admin_sort_Category.map((categoryItem, key) => (
            <li key={key}>
              <Link
                to={`/admin/${categoryItem.slug}`}
                className={current_category === categoryItem.slug ? 'active' : ''}
              >
                {categoryItem.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      { loading ?
        <div> </div>
        :
        <div className='user_review_container'>
          리뷰

        </div>
      }
      
    </div>
  )
}

export default Admin
