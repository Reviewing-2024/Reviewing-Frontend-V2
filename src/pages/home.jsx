import React from 'react'

import '../assets/scss/section/_main.scss'

const home = () => {
  return (
    <div id='home' role='home'>
      <div className='home__banner'>
        <img className='banner' src="/img/banner.png" alt="banner" />
      </div>
    </div>
  )
}

export default home