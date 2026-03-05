import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../../asserts/scss/section/_layout.scss";
import "../../asserts/scss/section/_header.scss";

import Login from "./Login";
import { useAuth } from "../../context/AuthContext";
import { RiArrowDropDownLine } from "react-icons/ri";

const Header = () => {
  const { isLogin, username, logout } = useAuth();
  const navigate = useNavigate();

  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    if (!userMenuOpen) return;

    const onMouseDown = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };

    const onKeyDown = (e) => {
      if (e.key === "Escape") setUserMenuOpen(false);
    };

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [userMenuOpen]);

  const handleLogout = () => {
    setUserMenuOpen(false);
    logout();
  };


  return (
    <div id="header" role="banner">
      <div className="header__content">
        <a className="header-logo" href="/">
          <img className="logo" src="/img/NavLogo.png" alt="Reviewing" />
        </a>

        <div className="header__content__userbtn">
          {isLogin ? (
            <div className="user-menu" ref={menuRef}>
              <button className="admin-btn"  onClick={() => navigate('/admin')} >
                관리자
              </button>
              <button
                className={`userbtn-login-togle ${userMenuOpen ? "is-open" : ""}`}
                onClick={() => setUserMenuOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={userMenuOpen}
              >
                <div className="avatar" aria-hidden="true">
                  <span className="avatar__text">S</span>
                </div>

                <span className="userbtn-name">{username}</span>
                <RiArrowDropDownLine />
              </button>

              {userMenuOpen && (
                <div className="user-dropdown" role="menu">
                  <a  
                    className="user-dropdown__item" 
                    role="menuitem" 
                    onClick={() => {
                      navigate('/mypage/review');
                      setUserMenuOpen(false)
                    }}
                  >
                    마이페이지
                  </a>
                  <button
                    className="user-dropdown__item danger"
                    onClick={handleLogout}
                    role="menuitem"
                  >
                    로그아웃
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              className="userbtn-login"
              onClick={() => setLoginModalOpen(true)}
            >
              로그인
            </button>
          )}
        </div>
      </div>

      {!isLogin && loginModalOpen && <Login onClose={() => setLoginModalOpen(false)} />}
    </div>
  );
};

export default Header;
