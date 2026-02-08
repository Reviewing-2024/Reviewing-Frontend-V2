import React from 'react'
import { useLocation } from 'react-router-dom';

import '../../assets/scss/section/_layout.scss'

const MainSection = (props) => {

   const location = useLocation();
   const isMyPage = location.pathname.startsWith('/mypage');

  return (
    <main id={isMyPage ? 'mypage_main' : 'main'} role="main">
        {props.children}
    </main>
  )
}

export default MainSection