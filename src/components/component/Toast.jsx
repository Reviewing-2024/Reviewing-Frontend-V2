import React from 'react'
import { useNavigate } from 'react-router-dom'

import '../../asserts/scss/component/_Toast.scss'
import { FaCircleCheck } from "react-icons/fa6";


const Toast = () => {
  const navigate = useNavigate();

  return (
    <div className="toast">
      <FaCircleCheck /> 찜한 강의에 추가했어요.
      <button onClick={() => navigate('/mypage/wish')}>보러가기</button>
    </div>
  )
}

export default Toast
