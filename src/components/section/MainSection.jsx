import React from 'react'
import { useLocation } from 'react-router-dom';

import '../../asserts/scss/section/_layout.scss'

const MainSection = (props) => {

  const location = useLocation();
  const isMyPage = ['/mypage', '/admin', '/policies/terms-and-conditions', '/policies/privacy-policy'].some(path =>
    location.pathname.startsWith(path)
  );

  return (
    <main id={isMyPage ? 'mypage_main' : 'main'} role="main">
        {props.children}
    </main>
  )
}

export default MainSection