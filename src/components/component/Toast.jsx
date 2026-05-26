import React from 'react'
import { useNavigate } from 'react-router-dom'

import '../../asserts/scss/component/_Toast.scss'
import { FaCircleCheck } from "react-icons/fa6";

const config = {
  add:    { message: <><FaCircleCheck /> 찜한 강의에 추가했어요.</> },
  remove: { message: '찜한 강의에서 삭제했어요.' },
}

const Toast = ({ type }) => {
    const navigate = useNavigate();
    const { message } = config[type] ?? config.add

  return (
    <div className="toast">
        {message} 
        <button onClick={() => navigate('/mypage/wish')}>보러가기</button>
    </div>
  )
}

export default Toast
