import React, { useState, useEffect, useCallback } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { mypage_Sort_Category, mypage_Review_Category } from '../data/mypagedata'
import ImgModal from '../components/component/ImgModal';
import ReviewDropdown from '../components/component/ReviewDropdown';
import DeleteReviewModal from '../components/component/DeleteReviewModal';
import MypageUserReviewCard from '../components/component/MypageUserReviewCard';
import '../asserts/scss/section/_mypage.scss'

const Mypage = () => {
  const accessToken = localStorage.getItem("accessToken");
  const { sortCategory } = useParams();
  const navigate = useNavigate();

  const [current_category, setCurrent_category] = useState('review');
  const [review_current_category, setReview_current_category] = useState('전체 리뷰');
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [isImgModalOpen, setIsImgModalOpen] = useState(false);
  const [openReviewId, setOpenReviewId] = useState(null);

  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    setCurrent_category(sortCategory ?? 'review');
  }, [sortCategory]);


  //accessToken없으면 메인화면으로
  if (!accessToken) {
    navigate('/')
    alert("로그인이 필요합니다.");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("ko-KR");
  };

  const getState = (category) => {
    if (category === '검토중') return 'PENDING';
    if (category === '승인됨') return 'APPROVED';
    if (category === '거절됨') return 'REJECTED';
    return '';
  }

  //리뷰 요청
  const fetchReviews = async (pageNum = 0) => {
    if (loading) return;
    if (pageNum > 0 && !hasMore) return;
    setLoading(true);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/members/me/reviews`,
        {
          params: {
            state: getState(review_current_category),
            page: pageNum,
            size: 5
          },
          headers: { Authorization: accessToken }
        }
      );

      const data = response.data.data;

      setReviews(prev =>
        pageNum === 0 ? data.content : [...prev, ...data.content]
      );
      setHasMore(data.content.length > 0 && !data.last);
      setPage(pageNum);

    } catch (error) {
    } finally {
      setLoading(false);
    }
  };


  //리뷰 삭제
  const deleteReview = async () => {
    try {

      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/reviews/${selectedReviewId}`,
        {
          headers: {
            Authorization: accessToken
          }
        }
      );

      setReviews(prev =>
        prev.filter(review => review.reviewId !== selectedReviewId)
      );

      setIsDeleteModalOpen(false);
      setSelectedReviewId(null);

      alert("리뷰가 삭제되었습니다.");

    } catch (error) {
      alert("리뷰 삭제에 실패했습니다.");
    }
  };


  // 카테고리 바뀌면 초기화
  useEffect(() => {
    setHasMore(true);
    setPage(0);
    fetchReviews(0);
  }, [review_current_category]);

  // 스크롤 감지
  const handleScroll = useCallback(() => {
    if (loading || !hasMore) return;
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    if (scrollHeight - scrollTop - clientHeight < 100) {
      fetchReviews(page + 1);
    }
  }, [loading, hasMore, page]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  console.log(reviews)

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

          {!loading && reviews.length === 0 ? (
            <div className='empty-result'>
              <h3>작성한 리뷰가 없습니다.</h3>
              <p>강의를 수강하고 첫 리뷰를 작성해보세요!</p>
            </div>
          ) : (
            reviews.map((review) => (
              <MypageUserReviewCard
                key={review.reviewId}
                review={review}
                openReviewId={openReviewId}
                setOpenReviewId={setOpenReviewId}
                isImgModalOpen={isImgModalOpen}
                setIsImgModalOpen={setIsImgModalOpen}
                openDropdownId={openDropdownId}
                setOpenDropdownId={setOpenDropdownId}
                setSelectedReviewId={setSelectedReviewId}
                setIsDeleteModalOpen={setIsDeleteModalOpen}
              />
            ))
          )}

          {loading && <p>로딩중...</p>}
          {isDeleteModalOpen && (
            <DeleteReviewModal
              onClose={() => {
                setIsDeleteModalOpen(false);
                setSelectedReviewId(null);
              }}
              onDelete={deleteReview}
            />
          )}

        </div>
      </div>
    </div>
  )
}

export default Mypage;