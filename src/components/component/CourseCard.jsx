import React from 'react'
import { Link } from 'react-router-dom'


const CourseCard = ({course}) => {

    return (
        <div className="course" >
            <Link className='course__container' key={course.id} to={`/courses/${course.slug}`}>
                <div className='course-img-container'>
                    <img src={course.thumbnailImage} alt="강의 이미지" />
                    <span>{course.platform}</span>
                    <button>하트</button>
                </div>
                <div className='course-information-container'>
                    <div className='information-container'>
                        <h3>{course.title}</h3>
                        <p>{course.teacher}</p>
                    </div>
                    <div className='userReview-contanier'>
                        <div className='rating'>
                            <span>{course.rating}</span>
                        </div>
                        <div className='ㅣ'></div>
                        <div className='wish'>
                            <span>좋아요수</span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default CourseCard