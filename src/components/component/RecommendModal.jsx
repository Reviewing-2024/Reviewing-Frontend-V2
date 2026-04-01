import React from 'react'


import '../../asserts/scss/component/_RecommendModal.scss'
import CourseCard from './CourseCard'

const RecommendModal = ( {onClose} ) => {
  return (
    <div className='recommend_modal_overlay' onClick={onClose}>
      <div className='recommend_modal'
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}>
            추천 모달
        <div className='item__card'>
            {/* {courses.map(course => (
              <CourseCard course={course} key={course.id} />
                
            ))} */}
        </div>
      </div>
      
    </div>
  )
}

export default RecommendModal
