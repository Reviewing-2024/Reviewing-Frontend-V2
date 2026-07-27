import React from "react";
import { useNavigate } from "react-router-dom";

import ImgModal from "./ImgModal";
import ReviewDropdown from "./ReviewDropdown";

const MypageUserReviewCard = ({
  review,
  openReviewId,
  setOpenReviewId,
  isImgModalOpen,
  setIsImgModalOpen,
  openDropdownId,
  setOpenDropdownId,
  setSelectedReviewId,
  setIsDeleteModalOpen,
}) => {

  const navigate = useNavigate();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("ko-KR");
  };

  const status =
    review.state === "PENDING"
      ? "검토중"
      : review.state === "APPROVED"
      ? "승인됨"
      : "거절됨";

  return (
    <div className="user_review_container">

      <div className="review_body">

        <div className="review_top">

          <div className="course_img">
            <img
              src={review.courseThumbnailImage}
              alt={review.courseTitle}
            />
          </div>

          <div className="course_information">

            <div className="course_header">
              <span className="course_platform">
                {review.coursePlatform}
              </span>

              <h3
                className="course_title"
                onClick={() =>
                  navigate(
                    `/courses/${review.coursePlatform}/${review.courseSlug}`
                  )
                }
              >
                {review.courseTitle}
              </h3>
            </div>

            <p className="review_date">
              {formatDate(review.createdAt)}
            </p>

            <div className="review_content">
              <p>{review.content}</p>
            </div>

          </div>

          <div className="review_management">

            <span
              className={`status_badge ${
                status === "거절됨"
                  ? "reject"
                  : status === "검토중"
                  ? "pending"
                  : "approved"
              }`}
            >
              {status}
            </span>

            <ReviewDropdown
              reviewId={review.reviewId}
              openDropdownId={openDropdownId}
              setOpenDropdownId={setOpenDropdownId}
              setSelectedReviewId={setSelectedReviewId}
              setIsDeleteModalOpen={setIsDeleteModalOpen}
            />

          </div>

        </div>

        <div className="toggle_row">

          <button
            className="toggle_btn"
            onClick={() =>
              setOpenReviewId(
                openReviewId === review.reviewId
                  ? null
                  : review.reviewId
              )
            }
          >
            {openReviewId === review.reviewId
              ? "접기 ▲"
              : "자세히 보기 ▼"}
          </button>

        </div>

      </div>

      {openReviewId === review.reviewId && (

        <div className="certificate_section">

          <p className="certificate_label">
            제출한 증빙 자료
          </p>

          <div className="certificate_image">

            <img
              src={`${import.meta.env.VITE_API_BASE_URL}${review.certification}`}
              alt="인증 이미지"
              onClick={() => setIsImgModalOpen(true)}
            />

          </div>

          {isImgModalOpen && (
            <ImgModal
              imgsrc={`${import.meta.env.VITE_API_BASE_URL}${review.certification}`}
              onClose={() => setIsImgModalOpen(false)}
            />
          )}

        </div>

      )}

    </div>
  );
};

export default MypageUserReviewCard;