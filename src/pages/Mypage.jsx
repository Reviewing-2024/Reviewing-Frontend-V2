import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import { mypage_Sort_Category, mypage_Review_Category } from '../data/mypagedata'
import { PiDotsThreeOutlineFill } from "react-icons/pi";

import ImgModal from '../components/component/ImgModal';

import '../asserts/scss/section/_mypage.scss'

const Mypage = () => {
  const accessToken = localStorage.getItem("accessToken");
  const { sortCategory } = useParams();

  const [current_category, setCurrent_category] = useState('review');
  const [review_current_category, setReview_current_category] = useState('전체 리뷰');

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const [Certificate_sectionOpen, setCertificate_sectionOpen] = useState(false);
  const [isImgModalOpen, setIsImgModalOpen] = useState(false);
  const [openReviewId, setOpenReviewId] = useState(null);

  useEffect(() => {
    if (sortCategory) {
      setCurrent_category(sortCategory);
    } else {
      setCurrent_category('review');
    }
  }, [sortCategory]);

  //시간 한국시간 기준으로
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("ko-KR");
  };

  const fetchReviews = async (state = '') => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/members/me/reviews`,
        {
          params: {
            state: state,
            page: 0,
            size: 10
          },
          headers: {
            Authorization: accessToken
          }
        }
      );

      setReviews(response.data.data.content);

    } catch (error) {

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let state = '';

    if (review_current_category === '검토중') state = 'PENDING';
    if (review_current_category === '승인됨') state = 'APPROVED';
    if (review_current_category === '거절됨') state = 'REJECTED';

    fetchReviews(state);
  }, [review_current_category]);

  return (
    <div id='mypage' role='mypage'>
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
        <div className='review-category'>
          <ul>
            {mypage_Review_Category.map((Review_Category, key) => {
              const isActive = review_current_category === Review_Category.title;
              return (
                <li key={key}>
                  <button
                    onClick={() => setReview_current_category(Review_Category.title)}
                    className={isActive ? 'active' : ''}
                    disabled={isActive}
                  >
                    {Review_Category.title}
                    {isActive && <div className="underline" />}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        <div className='user_review'>

          {loading && <p>로딩중...</p>}

          {!loading && reviews.map((review) => {
            const status =
              review.state === 'PENDING' ? '검토중'
                : review.state === 'APPROVED' ? '승인됨'
                  : '거절됨';


            return (
              <div className='user_review_container' key={review.reviewId}>

                <div className="review_body">
                  <div className="review_top">
                    <div className='course_img'>
                      <img src={review.courseThumbnailImage} alt={review.courseTitle} />
                    </div>

                    <div className='course_information'>
                      <div className="course_header">
                        <span className="course_platform">{review.coursePlatform}</span>
                        <h3 className="course_title">{review.courseTitle}</h3>
                      </div>
                      <p className="review_date">
                        {formatDate(review.createdAt)}
                      </p>
                      <div className="review_content">
                        <p>{review.content}</p>
                      </div>
                    </div>

                    <div className='review_management'>
                      <span className={`status_badge ${status === '거절됨' ? 'reject' : status === '검토중' ? 'pending' : 'approved'}`}>
                        {status}
                      </span>
                      <PiDotsThreeOutlineFill className="dots_icon" />
                    </div>
                  </div>

                  <div className="toggle_row">
                    <button
                      className="toggle_btn"
                      onClick={() =>
                        setOpenReviewId(
                          openReviewId === review.reviewId ? null : review.reviewId
                        )
                      }
                    >
                      {openReviewId === review.reviewId
                        ? '접기 ▲'
                        : '자세히 보기 ▼'}
                    </button>
                  </div>
                </div>
                {openReviewId === review.reviewId && (
                  <div className="certificate_section">
                    <p className="certificate_label">제출한 증빙 자료</p>

                    <div className="certificate_image">
                      <img
                        src={`${import.meta.env.VITE_API_BASE_URL}${review.certification}`}
                        alt="인증 이미지"
                        onClick={() => setIsImgModalOpen(true)}
                      />
                    </div>
                    {isImgModalOpen && (
                  <ImgModal 
                    imgsrc={`${import.meta.env.VITE_API_BASE_URL}${review.certification}`}
                    onClose={() => setIsImgModalOpen(false)}
                  />
                )}
                  </div>
                  
                )}
        
              </div>
            );
          })}

        </div>
      </div>
    </div>
  )
}

export default Mypage;