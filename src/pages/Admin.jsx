import React, { useState, useEffect } from 'react'
import axios from 'axios';
import '../asserts/scss/section/_admin.scss'
import { admin_sort_Category } from '../data/mypagedata.js'
import { handleApiError } from '../data/apierror.js'
import AdminReviewCard from '../components/component/AdminReviewCard';

const Admin = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [current_category, setCurrent_category] = useState('PENDING');


  //승인 전 리뷰 조회
  const fetchResponse = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/reviews`,
        {
          params: { state: current_category, page: 0, size: 10 },
          headers: { Authorization: accessToken },
        }
      );

      setResponse(res.data.data.reviews.content);
      
    } catch (error) {

      handleApiError(error);

    }

    setLoading(false);

  };

  useEffect(() => {
    fetchResponse();
    
  }, [current_category]);


  //리뷰 승인
  const handleApprove = async (id) => {
    await axios.patch(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/reviews/${id}/approve`,
      {},
      { headers: { Authorization: accessToken } }
    );
    fetchResponse();
  };

  //리뷰 거절
  const handleReject = async (id, reason) => {
    await axios.patch(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/reviews/${id}/reject`,
      { rejectionReason: reason },
      { headers: { Authorization: accessToken } }
    );
    fetchResponse();
  };

  if (error) return <div>에러가 발생했습니다</div>;
  if (!response) return <div className='user_review_container'>리뷰없음</div>;

  return (
    <div id='admin' role='admin'>
      <p className='admin-title'>리뷰 관리</p>
      <nav className='admin-sort-category'>
        <ul className={`tab-${current_category}`}>
          {admin_sort_Category.map((categoryItem, key) => (
            <li key={key}>
              <button
                onClick={() => setCurrent_category(categoryItem.slug)}
                className={current_category === categoryItem.slug ? 'active' : ''}
              >
                {categoryItem.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      {loading ? (
        <div> </div>
      ) : (
        <div className='user_review_container'>
          <div className="review-list">
            {response.map((review) => (
              <AdminReviewCard
                key={review.id}
                review={review}
                onApprove={handleApprove}
                onReject={handleReject}
                current_category={current_category}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;