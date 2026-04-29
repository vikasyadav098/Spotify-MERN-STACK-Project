import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, allowedRole }) => {
  // getting user from localstorage, hope it works lol
  const user = JSON.parse(localStorage.getItem('user'))

  // if no user then go back to login page
  if (!user) {
    return <Navigate to='/login' />
  }

  // if role is given and doesnt match then redirect
  if (allowedRole && user.role !== allowedRole) {
    // artist should go to dashboard, normal user to home
    return user.role === 'artist' 
      ? <Navigate to='/artist/dashboard' />
      : <Navigate to='/' />
  }

  // everything ok so show the page
  return children
}

export default ProtectedRoute