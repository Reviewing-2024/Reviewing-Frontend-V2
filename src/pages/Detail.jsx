import React, { useEffect, useState } from 'react'
import { href, useParams } from 'react-router-dom'
import axios from 'axios';

import '../asserts/scss/section/_detail.scss'

import { Sort_Category } from '../data/platform.js'
import { handleApiError } from '../data/apierror.js'

import StarRatingInput from '../components/component/StarRatingInput'
import Image from '../components/component/Image';

import { FaHeart, FaRegHeart, FaThumbsDown, FaThumbsUp, FaXmark } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { FiUpload, FiExternalLink } from "react-icons/fi";
import ReviewCard from '../components/component/ReviewCard';

const Detail = () => {

  const [current_category, setCurrent_category] = useState('LATEST');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReview, setNewReview] = useState({});
  const [courses, setCourses] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [createReviewloading, setCreateReviewloading] = useState(false);
  const [wishes_togle, setWishes_togle] = useState(false);

  const params = useParams();
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  //강의 url이동
  const handleOpenNewTab = (url) => {
    window.open(url, "_blank", "noopener, noreferrer");
  };


  //강의 조회
    const fetchCourses = async () => {

      try {

        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/courses/${params.platform}/${params.slug}`
        );

        setCourses(response.data.data);

      } catch (error) {
        console.error("강의 불러오기 실패:", error);
      }

    };

    useEffect(() => {

      fetchCourses();

    }, []);

  // 리뷰 작성 폼 함수
  const handleCreateReview = async () => {

    setCreateReviewloading(true);

    const formData = new FormData();
    formData.append(
      "reviewRequestDto",
      new Blob(
        [JSON.stringify({
          rating: newReview.rating,
          content: newReview.contents,
        })],
        { type: "application/json" }
      )
    );
    if (newReview.file) {
      formData.append("certificationFile", newReview.file);
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/reviews/${courses.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: accessToken,
          },
        },
      );

      setShowReviewModal(false);
      setNewReview({});
      alert(`소중한 리뷰를 작성해 주셔서 감사합니다! ☺️ \n작성하신 리뷰는 관리자가 신속히 검토하겠습니다! \n진행 상황은 마이페이지에서 확인하실 수 있습니다.`);
    } catch (error) {
      handleApiError(error)
    }
  };

  //유저 리뷰 조회
  useEffect(() => {
    if (!courses?.id) return;

    const fetchRivew = async () => {

      try {

        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/reviews/${courses.id}`, {
          params: {
            sort: current_category,
            page: 0,
            size: 10,
          }
        });

        setReviews(response.data.data.content);


      } catch (error) {
        console.error("강의 불러오기 실패:", error);
      }


    };

    fetchRivew();

  }, [courses?.id, current_category]);

  //wish 추가 및 삭제
    const handleWish = async (id, wishes) => {

    const url = `${import.meta.env.VITE_API_BASE_URL}/api/v1/courses/${id}/wish`;

    const config = {
        headers: { Authorization: accessToken }
    };
    
    try {
         if (wishes == 0) {
            await axios.post(url, {}, config);
        } else {
            await axios.delete(url, config);
        }
        } catch (error) {

            handleApiError(error);
            
        }

        fetchCourses();

    }; 

  return (
    <section id='detail'>
      <div className='detail__container'>
        <div className='detail-img-container'>
          <Image course={courses} />
        </div>
        <div className='detail-information'>
          <div className='detail-information-container'>
            <span className='information-platform'>{courses.platform}</span>
            <h1>{courses.title}</h1>
            <p>{courses.teacher}</p>
              <div className="information-stars">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                  />
                ))}
                <div className='information-rating'> {courses.rating}</div>
              </div>
          </div>
          <div className='information-container-btn'>
            <button 
              className='detail-btn' 
              onClick={() => { handleOpenNewTab(courses.url); }} 
            >
              강의 페이지로 이동 <FiExternalLink />
            </button>
            <button 
              className={courses.wishes == 1 ? 'active' : 'detail-wish-btn'}
              onClick={()=>{handleWish(courses.id, courses.wishes)}}
            >
              {courses.wishes == 1 ? <FaHeart/> : <FaRegHeart />}
            </button>
          </div>
        </div>
      </div>
      <div className='review-container'>
        <div className='review-header'>

          <h2>수강생 리뷰</h2>


          <div className='sort-category'>
            <ul>
              {Sort_Category.map((sort_category, key) => (
                <li key={key}>
                  <button
                    onClick={() => setCurrent_category(sort_category.sort)}
                    className={current_category === sort_category.sort ? 'active' : ''}
                  >
                    {sort_category.title}
                  </button>
                </li>
              ))}
            </ul>
            <div className='ㅣ'></div>
            <div className='review-write'>
              <button onClick={() => setShowReviewModal(true)}>리뷰 작성하기</button>
            </div>
          </div>
        </div>
        <div className='review-list'>
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
            />
          ))}
        </div>
      </div>
      {showReviewModal && (
        <div className="review-modal" onClick={() => setShowReviewModal(false)}>
          <div className="review-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="review-modal-close"
              onClick={() => setShowReviewModal(false)}
              aria-label="닫기"
              type="button"
            >
              <FaXmark />
            </button>

            <h2 className="review-modal-title">리뷰 작성하기</h2>
            <p className="review-modal-subtitle">
              이 강의는 어떠셨나요? 솔직한 후기를 들려주세요.
            </p>

            <div className="review-modal-body">
              <div className="modal-input-group rating-row">
                <StarRatingInput
                  value={newReview.rating || 0}
                  onChange={(val) => setNewReview((prev) => ({ ...prev, rating: val }))}
                />
              </div>

              <div className="modal-input-group">
                <label htmlFor="contents">리뷰 내용</label>
                <textarea
                  id="contents"
                  value={newReview.contents || ""}
                  onChange={(e) =>
                    setNewReview((prev) => ({ ...prev, contents: e.target.value }))
                  }
                  placeholder={`강의의 장점, 단점, 추천 대상 등 자유롭게 작성해주세요.`}
                />
              </div>

              <div className="modal-input-group">
                <label>파일 첨부</label>
                <label className="file-dropzone">
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) =>
                      setNewReview((prev) => ({ ...prev, file: e.target.files?.[0] }))
                    }
                  />
                  <div className="file-dropzone-inner">
                    <div className="upload-icon"><FiUpload /></div>
                    <p>파일을 업로드하거나 클릭하여 선택하세요</p>
                    {newReview.file && (
                      <p className="file-name">{newReview.file.name}</p>
                    )}
                  </div>
                </label>
              </div>

              <div className="review-modal-notice">
                <li>
                  <ul>• 강의 수강을 증명할 수 있는 자료를 첨부해주세요.</ul>
                  <ul>&nbsp; (예: 강의 수강 화면 캡처, 수강 증명서 등)</ul>
                  <ul>• 무관한 내용이나 부적절한 파일은 승인이 거절될 수 있습니다.</ul>
                  <ul>• 첨부 자료는 리뷰 승인 목적으로만 사용되며 안전하게 보호됩니다.</ul>
                  <ul>• 리뷰와 관련 없는 개인정보나 민감한 정보를 포함하지 않도록 주의해주세요.</ul>
                </li>
              </div>
            </div>

            <div className="review-modal-buttons">
              <button
                className="btn-cancel"
                onClick={() => setShowReviewModal(false)}
                type="button"
              >
                취소
              </button>
              <button className="btn-submit" onClick={handleCreateReview} type="button">
                등록하기
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Detail
