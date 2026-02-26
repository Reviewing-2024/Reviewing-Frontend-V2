import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { mypage_Sort_Category } from '../data/mypagedata'
import { CiCamera } from "react-icons/ci";
import '../asserts/scss/section/_profile.scss'

const Profile = () => {
  const { sortCategory } = useParams()
  const [current_category, setCurrent_category] = useState('profile')

  const username = localStorage.getItem('username')

  useEffect(() => {
    if (sortCategory) 
      setCurrent_category(sortCategory)
    else 
      setCurrent_category('profile')
  }, [sortCategory])

  return (
    <div id="profile" role="profile" className="profile-page">
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
                <span className="avatar__text">S</span>
                <button type="button" className="avatar__camera" aria-label="사진 변경">
                  <CiCamera />
                </button>
              </div>
              <button type="button" className="btn btn--ghost">
                사진 변경
              </button>
            </div>
            <form className="profile-form" onSubmit={(e) => e.preventDefault()}>
              <div className="field">
                <label className="field__label" htmlFor="nickname">
                  닉네임
                </label>
                <input
                  id="nickname"
                  className="field__input"
                  type="text"
                  placeholder="닉네임을 입력하세요"
                  defaultValue={username}
                />
              </div>

              <div className="field">
                <label className="field__label" htmlFor="email">
                  이메일
                </label>
                <input
                  id="email"
                  className="field__input"
                  type="email"
                  defaultValue="이메일"
                  disabled
                />
                <p className="field__help">이메일은 변경할 수 없습니다.</p>
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
  )
}

export default Profile
