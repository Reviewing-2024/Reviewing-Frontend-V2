import React from "react";
import '../../asserts/scss/component/_reviewCard.scss';

import { FaStar } from "react-icons/fa";
import { FiThumbsUp, FiThumbsDown, FiUser } from "react-icons/fi";

const ReviewCard = ({ review }) => {

  const {
    memberName,
    content,
    rating,
    likes,
    dislikes,
    createdAt,
  } = review;


  const formatDate = (dateString) => {
    const date = new Date(dateString);

    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).replace(/\. /g, "-").replace(".", "");
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
              {memberName}
            </span>

            <div className="reviewCard-stars">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={index < rating ? "star active" : "star"}
                />
              ))}
            </div>

          </div>

        <div className="reviewCard-date">
            {formatDate(createdAt)}
        </div>
          

      </div>


        <div className="reviewCard-content">
          {content}
        </div>

        <div className="reviewCard-actions">

          <button className="reviewCard-action-btn">
            <FiThumbsUp />
            <span>{likes}</span>
          </button>


          <button className="reviewCard-action-btn">
            <FiThumbsDown />
            <span>{dislikes}</span>
          </button>

        </div>

      </div>

    </div>
  );
};

export default ReviewCard;