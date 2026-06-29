import React from 'react'

import { PiDotsThreeOutlineFill, PiTrash } from "react-icons/pi";
import '../../asserts/scss/component/_reviewDropdown.scss';

const ReviewDropdown = ({
  reviewId,
  openDropdownId,
  setOpenDropdownId,
  setSelectedReviewId,
  setIsDeleteModalOpen,
}) => {

  const isOpen = openDropdownId === reviewId;

  const handleToggle = () => {
    setOpenDropdownId(isOpen ? null : reviewId);
  };

  const handleDeleteClick = () => {
    setSelectedReviewId(reviewId);
    setIsDeleteModalOpen(true);
    setOpenDropdownId(null);
  };

  return (
    <div className="dropdown_wrapper">

      <PiDotsThreeOutlineFill
        className="dots_icon"
        onClick={handleToggle}
      />

      {isOpen && (
        <div className="review_dropdown">

          <button
            className="delete_review_btn"
            onClick={handleDeleteClick}
          >
            <span className="delete_icon"><PiTrash /></span>
            <span>리뷰 삭제</span>
          </button>

        </div>
      )}

    </div>
  );
};

export default ReviewDropdown;