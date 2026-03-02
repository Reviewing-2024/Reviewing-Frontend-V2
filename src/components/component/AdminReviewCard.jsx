import React from "react";
import '../../asserts/scss/section/_admin.scss'

import { FiExternalLink } from "react-icons/fi";

const AdminReviewCard = ({ review, onApprove, onReject }) => {
    const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("ko-KR");
  };

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  return (
    <div className="review-card">
      <div className="review-card-left">
        <div className="review-header">
          <h3>{review.courseTitle}</h3>
          <button
            className="move-btn"
            onClick={() => window.open(review.courseUrl, "_blank")}
          >
            강의 페이지로 이동 <FiExternalLink />
          </button>
        </div>

        <div className="review-meta">
          <span className="review-meta-memberName">{review.memberName}</span> 
          <span>•</span> 
          <span>{formatDate(review.createdAt)}</span>
        </div>

            <p className="review-content">
                {review.content}
            </p>

            <p className="review-imgalt">
                인증 이미지
            </p>
        

        {review.certificaton && (
          <div className="review-image">
            <img
              src={`${BASE_URL}${review.certificaton}`}
              alt="인증 이미지"
            />
          </div>
        )}

      </div>

      <div className="review-card-right">

        <button
          className="approve-btn"
          onClick={() => onApprove(review.id)}
        >
          승인
        </button>

        <button
          className="reject-btn"
          onClick={() => onReject(review.id)}
        >
          거절
        </button>

      </div>

    </div>
  );
};

export default AdminReviewCard;