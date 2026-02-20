import React from 'react'
import { useNavigate } from 'react-router-dom';

import kakaoBtn from '../../asserts/img/kakao_login_medium_narrow.png';
import { FaXmark } from "react-icons/fa6";
import '../../asserts/scss/section/_login.scss'

const Login = ({ onClose }) => {

  const navigate = useNavigate();

  return (
    <div className='login__overlay'>
      <div className='login'>
        <button className='login-cancel' onClick={onClose}><FaXmark /></button>
        <div className='login__container'>
          <h2>로그인</h2>
          <p>간편하게 로그인하고 강의 리뷰와 찜 기능을 이용해보세요.</p>
        </div>
        <div className='login__btn__container'>
          <button className='kakaologin-btn' onClick={() => navigate(`${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization/kakao`)} >
            <img src={kakaoBtn} alt="카카오 로그인" /> 
          </button>
        </div>
        <p>로그인은 서비스 이용을 위한 최소한의 정보만 사용합니다.</p>
      </div>
    </div>
  )
}

export default Login
