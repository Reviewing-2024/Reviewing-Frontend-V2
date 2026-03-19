import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

import { handleApiError } from '../../data/apierror';
import { useAuth } from '../../context/AuthContext';

import { FaHeart, FaRegHeart, FaThumbsDown, FaThumbsUp } from "react-icons/fa6";
import Image from './Image';

const CourseCard = ({ course }) => {
    const accessToken = localStorage.getItem("accessToken");
    const {logout} = useAuth();


    //wish 추가 및 삭제
    const handleWish = async (id, wished) => {

    const url = `${import.meta.env.VITE_API_BASE_URL}/api/v1/courses/${id}/wish`;

    const config = {
        headers: { Authorization: accessToken }
    };
    
    try {
         if (wished == false) {
            await axios.post(url, {}, config);
        } else {
            await axios.delete(url, config);
        }
        } catch (error) {

            handleApiError(error, {logout})
            
        }

    }; 

    return (
        <div className="course" >
            <Link className='course__container' key={course.id} to={`/courses/${course.platform}/${course.slug}`}>
                <div className='course-img-container'>
                    <Image course={course} />
                    <span>{course.platform}</span>
                    <button 
                        className={course.wished ? 'active' : 'course-wishes'}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleWish(course.id, course.wished);
                        }}
                    >
                        {course.wished ? <FaHeart/> : <FaRegHeart />}
                    </button>
                </div>
                <div className='course-information-container'>
                    <div className='information-container'>
                        <h3>{course.title}</h3>
                        <p>{course.teacher}</p>
                    </div>
                    <div className='userReview-contanier'>
                        <div className='rating-container'>
                            <span className='rating'>
                                <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                    <path fill="#FDCC0E" fillRule="evenodd" d="M8 1.3c.133 0 .263.037.375.108.113.07.203.17.262.29l1.778 3.637 3.978.583c.131.02.254.075.355.161.101.086.176.199.217.326.041.126.046.262.014.392-.031.13-.098.247-.193.34l-2.878 2.831.68 3.996c.022.131.007.267-.042.39-.05.124-.133.23-.24.31-.107.078-.234.125-.366.134-.132.01-.263-.018-.38-.08L8 12.831l-3.558 1.887c-.117.062-.248.09-.38.08-.132-.01-.259-.056-.365-.134-.107-.079-.19-.186-.24-.31-.05-.123-.065-.258-.043-.39l.68-3.997-2.88-2.83c-.094-.093-.161-.21-.193-.34-.032-.13-.027-.266.014-.393.04-.127.116-.24.217-.326.102-.086.225-.142.356-.16l3.978-.583 1.779-3.637c.059-.12.15-.22.262-.29.112-.07.242-.108.374-.108z" clipRule="evenodd" />
                                </svg>
                                {course.rating} 
                                <span className='comments'>({course.comments})</span>
                            </span>

                        </div>
                        <div className='ㅣ'></div>
                        <div className='wish'>
                            <span><FaRegHeart /> {course.wishes}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default CourseCard