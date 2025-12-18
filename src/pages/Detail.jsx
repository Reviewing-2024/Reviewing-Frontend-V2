import React from 'react'
import { Outlet, useParams } from 'react-router-dom'

const Detail = () => {
  const params = useParams();


  return (
    <div><p>{params.slug}</p></div>
  )
}

export default Detail