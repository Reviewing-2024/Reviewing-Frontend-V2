import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';

import { mypage_Sort_Category } from '../data/mypagedata.js'
import { handleApiError } from '../data/apierror.js'
import { useAuth } from "../context/AuthContext";

import { CiCamera } from "react-icons/ci";
import '../asserts/scss/section/_profile.scss'

const Profile = () => {
  const { sortCategory } = useParams()
  const [current_category, setCurrent_category] = useState('profile')
  const { logout } = useAuth();
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");
  const username = localStorage.getItem('username');
  const profileImage = localStorage.getItem('profileImage');

  const [nickname, setNickname] = useState(username);


  useEffect(() => {
    if (sortCategory) 
      setCurrent_category(sortCategory)
    else 
      setCurrent_category('profile')
  }, [sortCategory])

  //access토큰 없으면 메인페이지로
  if(!accessToken) {
    navigate('/');
  }

  //닉네임 변경
  const EditNickname = async () => {
    if (nickname === username) return;

    try {

      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/members/me/nickname`,
        {
          nickname: nickname
        },
        {
          headers: {
            Authorization: accessToken
          }
        }
      );

      const tokenRes = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/access`,
        {},
        {
          withCredentials: true
        }
      );

      const newAccessToken = tokenRes.headers.authorization;

      localStorage.setItem("accessToken", newAccessToken);
      localStorage.setItem("username", nickname);

      setNickname(nickname);
      window.location.reload();

    } catch (error) {

      handleApiError(error, { logout });

    }
  };

  return (
    <div id="profile" role="profile">
      <div className="profile-container">
        <h2 className="mypage-title">마이페이지</h2>
        <nav className="sort-category" aria-label="마이페이지 메뉴">
          <ul>
            {mypage_Sort_Category.map((categoryItem, key) => (
              <li key={key}>
                <Link
                  to={`/mypage${categoryItem.src}`}
                  className={`pill ${current_category === categoryItem.slug ? 'active' : ''}`}
                >
                  {categoryItem.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <section className="profile-card" aria-label="프로필 수정">
          <div className="profile-card__inner">
            <div className="profile-side">
              <div className="avatar">
                <img src={`${import.meta.env.VITE_API_BASE_URL}${profileImage}`} alt="profileImage" />
                <button type="button" className="avatar__camera" aria-label="사진 변경">
                  <CiCamera />
                </button>
              </div>
              <button type="button" className="btn btn--ghost">
                사진 변경
              </button>
            </div>
            <form 
              className="profile-form" 
              onSubmit={(e) => {
                e.preventDefault();
            }}>
              <div className="field">
                <label className="field__label" htmlFor="nickname">
                  닉네임
                </label>
                <input
                  id="nickname"
                  className="field__input"
                  type="text"
                  placeholder="닉네임을 입력하세요"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn--primary"
                        onClick={EditNickname}
                >
                  저장하기
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Profile
