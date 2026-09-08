import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from '../api/axiosInstance.js';

import { mypage_Sort_Category } from '../data/mypagedata.js';

import { CiCamera } from "react-icons/ci";

import MainSection from '../components/section/MainSection.jsx';

import '../asserts/scss/section/_profile.scss';

const Profile = () => {
  const { sortCategory } = useParams();
  const [current_category, setCurrent_category] = useState('profile');

  const navigate = useNavigate();
  
  const username = localStorage.getItem("username");
  const profileImage = localStorage.getItem("profileImage");

  const [nickname, setNickname] = useState(username);
  const [selectedFile, setSelectedFile] = useState(null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (sortCategory)
      setCurrent_category(sortCategory);
    else
      setCurrent_category('profile');
  }, [sortCategory]);

  //accessToken없으면 메인화면으로
   useEffect(() => {
      const accessToken = localStorage.getItem("accessToken");
  
      if (!accessToken) {
        alert("로그인이 필요합니다.");
        navigate('/');
      }
    }, [navigate]);

  const handleSave = async () => {
    const nicknameChanged = nickname !== username;
    const imageChanged = !!selectedFile;

    // 둘 다 변경 없으면 요청 안 보냄
    if (!nicknameChanged && !imageChanged) return;

    try {
      const formData = new FormData();

      // 변경된 것만 담아서 요청
      if (nicknameChanged) {
        formData.append('nickname', nickname);
      }

      if (imageChanged) {
        formData.append('file', selectedFile);
      }

      await api.patch(
        '/api/v1/members/me/profile',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      );

      // 프로필 수정 후 새로운 AccessToken 발급 
      // 이 요청은 shared api가 아니라 별도의 axios 사용 
      const authApi = axios.create(
        { baseURL: import.meta.env.VITE_API_BASE_URL, 
          withCredentials: true, 
        }
      );

      // 새 AccessToken 발급
      const tokenRes = await api.post(
        '/api/v1/auth/access',
        {},
        { 
          headers: { 
            Accept: 'application/json', 
          }, 
        }
      );

      const newAccessToken = tokenRes.headers.authorization;

      if (newAccessToken) {
        localStorage.setItem("accessToken", newAccessToken);
      }

      if (nicknameChanged) {
        localStorage.setItem("username", nickname);
      }

      window.location.reload();

    } catch (error) {
      console.error("프로필 수정 실패:", error); 
      alert("프로필 수정에 실패했습니다.");
    }
  };

  return (
    <MainSection
      title="프로필"
      description="프로필 페이지입니다.">

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
                  <img
                    src={
                      selectedFile
                        ? URL.createObjectURL(selectedFile)
                        : `${import.meta.env.VITE_API_BASE_URL}${profileImage}`
                    }
                  />
                  <button
                    type="button"
                    className="avatar__camera"
                    aria-label="사진 변경"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <CiCamera />
                  </button>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setSelectedFile(file);
                  }}
                />
              </div>

              <form
                className="profile-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave();
                }}
              >
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
                  <button type="submit" className="btn btn--primary">
                    저장하기
                  </button>
                </div>
              </form>

            </div>
          </section>

        </div>
      </div>
    </MainSection >
  );
};

export default Profile;