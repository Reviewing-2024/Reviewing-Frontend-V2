import React, { useState } from "react";
import '../../asserts/scss/component/_reviewCard.scss';
import axios from 'axios';

import { FaStar } from "react-icons/fa";
import { FiThumbsUp, FiThumbsDown, FiUser } from "react-icons/fi";

import { handleApiError } from '../../data/apierror';
import { useAuth } from '../../context/AuthContext';

const ReviewCard = ({ review, onAction }) => {

  const accessToken = localStorage.getItem("accessToken");
  const {logout} = useAuth();

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).replace(/\. /g, "-").replace(".", "");
  };


  //좋아요 기능
  const handleLike = async ( id, liked ) => {

    const url = `${import.meta.env.VITE_API_BASE_URL}/api/v1/reviews/${id}/like`;

    const config = {
        headers: { Authorization: accessToken }
    };
    
    try {
         if (liked == false) {
            await axios.post(url, {}, config);
        } else {
            await axios.delete(url, config);
        }
        onAction();
        } catch (error) {

            handleApiError(error, {logout})
            
        }

    }; 


    // 싫어요 기능
    const handleDislike = async ( id, disliked ) => {

    const url = `${import.meta.env.VITE_API_BASE_URL}/api/v1/reviews/${id}/dislike`;

    const config = {
        headers: { Authorization: accessToken }
    };
    
    try {
         if (disliked == false) {
            await axios.post(url, {}, config);
        } else {
            await axios.delete(url, config);
        }
        onAction();
        } catch (error) {

            handleApiError(error, {logout})
            
        }

    }; 

  return (
    <div className="review-card">

      <div className="reviewCard-profile">
        <FiUser />
      </div>


      <div className="reviewCard-main">

        <div className="reviewCard-header">

          <div className="reviewCard-user">

            <span className="reviewCard-name">
              {review.memberName}
            </span>

            <div className="reviewCard-stars">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={index < review.rating ? "star active" : "star"}
                />
              ))}
            </div>

          </div>

        <div className="reviewCard-date">
            {formatDate(review.createdAt)}
        </div>
          

      </div>


        <div className="reviewCard-content">
          {review.content}
        </div>

        <div className="reviewCard-actions">

          <button 
            className={review.liked ? 'likes_active' : 'reviewCard-action-btn likes-btn'} 
            onClick={() => handleLike(review.id, review.liked)}  
          >
            <FiThumbsUp />
            <span>{review.likes}</span>
          </button>


          <button 
            className={review.disliked ? 'dislikes_active' : 'reviewCard-action-btn dislikes-btn'}
              onClick={() => handleDislike(review.id, review.disliked)}
          >
            <FiThumbsDown /> 
            <span>{review.dislikes}</span>
          </button>

        </div>

      </div>

    </div>
  );
};

export default ReviewCard;