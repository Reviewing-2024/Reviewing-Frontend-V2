import React, { useState } from "react";
import '../../asserts/scss/section/_admin.scss'

import { FiExternalLink } from "react-icons/fi";
import { FaCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

import RejectModal from "./RejectModal";

const AdminReviewCard = ({ review, onApprove, onReject, current_category }) => {
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("ko-KR");
  };

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // 거절 확정 시 호출: reason은 선택/입력된 사유 문자열
  const handleRejectConfirm = (reason) => {
    onReject(review.id, reason);
  };

  return (
    <>
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
          <p className="review-content">{review.content}</p>
          <p className="review-imgalt">인증 이미지</p>
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
          {current_category === "PENDING" ? (
            <>
              <button
                className="approve-btn"
                onClick={() => onApprove(review.id)}
              >
                <FaCheck /> 승인
              </button>
              <button
                className="reject-btn"
                onClick={() => setIsRejectModalOpen(true)}
              >
                <IoMdClose /> 거절
              </button>
            </>
          ) : current_category === "APPROVED" ? (
            <div className="review-APPROVED">승인됨</div>
          ) : (
            <div className="review-REJECT">거절됨</div>
          )}
        </div>
      </div>

      <RejectModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        onConfirm={handleRejectConfirm}
      />
    </>
  );
};

export default AdminReviewCard;