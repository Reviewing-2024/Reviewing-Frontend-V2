import React, { useState } from "react";
import "../../asserts/scss/component/_Rejectmodal.scss";

import { IoMdClose } from "react-icons/io";

const REJECT_REASONS = [
  { id: "inappropriate", label: "강의 리뷰 내용이 적절하지 않아요." },
  { id: "invalid_cert", label: "인증 파일 양식이 올바르지 않아요." },
  { id: "direct", label: "직접 입력" },
];

const RejectModal = ({ isOpen, onClose, onConfirm }) => {
  const [selectedReason, setSelectedReason] = useState(null);
  const [customReason, setCustomReason] = useState("");

  if (!isOpen) return null;

  const handleConfirm = () => {
    const reason =
      selectedReason === "direct"
        ? customReason
        : REJECT_REASONS.find((r) => r.id === selectedReason)?.label || "";
    onConfirm(reason);
    handleClose();
  };

  const handleClose = () => {
    setSelectedReason(null);
    setCustomReason("");
    onClose();
  };

  const isConfirmDisabled =
    !selectedReason ||
    (selectedReason === "direct" && customReason.trim() === "");

  return (
    <div className="reject-modal__overlay" onClick={handleClose}>
      <div className="reject-modal__container" onClick={(e) => e.stopPropagation()}>
        <div className="reject-modal__header">
          <div>
            <h2 className="reject-modal__title">리뷰 거절 사유 선택</h2>
            <p className="reject-modal__subtitle">
              해당 리뷰를 거절하는 이유를 선택하거나 입력해주세요.
            </p>
          </div>
          <button className="reject-modal__close-btn" onClick={handleClose}>
            <IoMdClose />
          </button>
        </div>

        <div className="reject-modal__reason-list">
          {REJECT_REASONS.map((reason) => (
            <div
              key={reason.id}
              className="reject-modal__reason-item"
              onClick={() => setSelectedReason(reason.id)}
            >
              <span className="reject-modal__dot">
                {selectedReason === reason.id ? "●" : "○"}
              </span>
              <span
                className={`reject-modal__reason-label${
                  selectedReason === reason.id ? " reject-modal__reason-label--selected" : ""
                }`}
              >
                {reason.label}
              </span>
            </div>
          ))}
        </div>

        {selectedReason === "direct" && (
          <textarea
            className="reject-modal__textarea"
            placeholder="거절 사유를 입력해주세요."
            value={customReason}
            onChange={(e) => setCustomReason(e.target.value)}
          />
        )}

        <div className="reject-modal__footer">
          <button className="reject-modal__cancel-btn" onClick={handleClose}>
            취소
          </button>
          <button
            className="reject-modal__confirm-btn"
            onClick={handleConfirm}
            disabled={isConfirmDisabled}
          >
            거절 확정
          </button>
        </div>

      </div>
    </div>
  );
};

export default RejectModal;