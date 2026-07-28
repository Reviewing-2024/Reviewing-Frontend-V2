import React from 'react'
import { useLocation } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async'

import '../../asserts/scss/section/_layout.scss'

const MainSection = (props) => {

  const location = useLocation();
  const isMyPage = ['/mypage', '/admin', '/policies/terms-and-conditions', '/policies/privacy-policy'].some(path =>
    location.pathname.startsWith(path)
  );

  return (
    <HelmetProvider>
      <Helmet
        titleTemplate="Reviewing | %s"
        defaultTitle="Reviewing"
        defer={false}
      >
        {props.title && <title>{props.title}</title>}
        <meta name="description" content={props.description} />
      </Helmet>
      <main id={isMyPage ? 'mypage_main' : 'main'} role="main">
        {props.children}
      </main>
    </HelmetProvider>
  )
}

export default MainSection