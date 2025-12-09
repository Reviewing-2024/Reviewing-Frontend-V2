import React from 'react'

import '../../assets/scss/section/_layout.scss'

const MainSection = (props) => {
  return (
    <main id="main" role="main">
        {props.children}
    </main>
  )
}

export default MainSection