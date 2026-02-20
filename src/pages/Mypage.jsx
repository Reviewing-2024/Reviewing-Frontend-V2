import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';

import { mypage_Sort_Category, mypage_Review_Category } from '../data/mypagedata'
import { PiDotsThreeOutlineFill } from "react-icons/pi";

import '../asserts/scss/section/_mypage.scss'

import { course } from '../data/course';

const Mypage = () => {

  const { sortCategory } = useParams();

  const [current_category, setCurrent_category] = useState('review');

  const [review_current_category, setReview_current_category] = useState('전체 리뷰');


  useEffect(() => {
    if (sortCategory) {
      setCurrent_category(sortCategory);
    } else {
      setCurrent_category('review');
    }
  }, [sortCategory]);


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
                    {isActive && (
                      <div className="underline" />
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
        <div className='user_review'>
          {course.filter((c) => (c.userReviews?.length ?? 0) > 0)
            .map((c) => {
              const review = c.userReviews?.[0];
              const status =
                review?.status === 'PENDING' ? '검토중'
                  : review?.isApproved === true ? '승인됨'
                    : review?.isApproved === false ? '거절됨'
                      : '검토중';

              return (
                <div className='user_review_container' key={c.id}>
                  <div className='course_img'>
                    <img src={c.thumbnailImage} alt={c.title} />
                  </div>

                  <div className='course_information'>
                    <div className="course_text">
                      <span>{c.platform}</span>
                      <h3>{c.title}</h3>
                    </div>
                    <div className='review_management'>
                      <span>{status}</span>
                      <PiDotsThreeOutlineFill />
                    </div>
                  </div>
                  <div>
                    <span></span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

    </div>
  )
}

export default Mypage
