import React from 'react'
import { useParams } from 'react-router-dom'

import '../assets/scss/section/_detail.scss'

import { course } from '../data/course'

const Detail = () => {

    const params = useParams();

    let courses = course.find(function(x){
        return x.slug == params.slug
      });


  return (
    <section id='detail'>
      <div className='detail__container'>
        <div className='detail-img-container'>
          <img src={courses.thumbnailImage} alt="이미지" />
        </div>
        <div className='detail-information'>
          <div className='detail-information-container'>
            <span className='information-platform'>{courses.platform}</span>
            <h1>{courses.title}</h1>
            <p>{courses.teacher}</p>
            <span className='information-rating'>{courses.rating}</span>
          </div>
          <div className='information-container-btn'>
            <button className='detail-btn'>강의 페이지로 이동</button>
            <button className='detail-wish-btn'>하트</button>
          </div>
        </div>
      </div>
      <div className='review-container'>
        <div className='review-header'>
          
            <h2>수강생 리뷰</h2>
          
          
          <div className='review-category'>
            <ul>
              <li>
                <button>최신순</button>
              </li>
              <li>
                <button>높은 평점순</button>
              </li>
              <li>
                <button>낮은 평점순</button>
              </li>
            </ul>
            <div className='review-write'>
                <button>리뷰 작성하기</button>
            </div>
          </div>
        </div>
        <div className='review-list'>
          <div className='review-caerd'>

          </div>
        </div>
      </div>
    </section>
  )
}

export default Detail
