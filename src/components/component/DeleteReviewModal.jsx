import '../../asserts/scss/component/_deleteReviewModal.scss';

const DeleteReviewModal = ({
  onClose,
  onDelete
}) => {

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="delete_modal_overlay"
      onClick={handleOverlayClick}
    >
      <div className="delete_modal">

        <h2>리뷰를 삭제하시겠습니까?</h2>

        <div className="delete_modal_content">
          <p>리뷰를 삭제하면 현재 승인 상태가 모두 사라집니다.</p>

          <p>
            동일 강의에 다시 리뷰를 작성할 경우
            관리자의 승인을 다시 받아야 합니다.
          </p>

          <p className="delete_question">
            정말 삭제하시겠습니까?
          </p>
        </div>

        <div className="delete_modal_button">

          <button
            className="cancel_button"
            onClick={onClose}
          >
            취소
          </button>

          <button
            className="delete_button"
            onClick={onDelete}
          >
            삭제하기
          </button>

        </div>

      </div>
    </div>
  );
};

export default DeleteReviewModal;