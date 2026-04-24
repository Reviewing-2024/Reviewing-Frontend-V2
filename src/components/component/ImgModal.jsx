import React, { useEffect } from 'react';
import '../../asserts/scss/component/_ImgModal.scss';

import { MdCancel } from "react-icons/md";

const ImgModal = ({ imgsrc, onClose }) => {

    useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
        document.body.style.overflow = "auto";
    };
    }, []);

  return (
    <div className="img-modal-overlay" onClick={onClose}>
      <div 
        className="img-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className='img-modal-close' onClick={onClose}><MdCancel /></button>
        <img src={imgsrc} alt="인증 이미지" />
      </div>
    </div>
  );
};

export default ImgModal;