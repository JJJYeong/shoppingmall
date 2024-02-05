import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const NotAuthROutes = ({isAuth}) => {
  return (
    isAuth ? <Navigate to={'/'} /> : <Outlet />
  )
}

export default NotAuthROutes