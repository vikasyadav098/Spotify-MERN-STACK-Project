import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import AlbumDetails from '../pages/AlbumDetails'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ProtectedRoute from './ProtectedRoute'
import Dashboard from '../pages/Dashboard'
import UploadSong from '../pages/UploadSong'

const AppRoutes = () => {
  return (
    <div>
      <Routes>

        {/* these are protected, user must be logged in */}
        <Route path='/' element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />

        <Route path='/albums/:albumId' element={
          <ProtectedRoute>
            <AlbumDetails />
          </ProtectedRoute>
        } />

        {/* only artist can access this route */}
        <Route path='/artist/dashboard' element={
          <ProtectedRoute allowedRole="artist">
            <Dashboard />
          </ProtectedRoute>
        } />

        {/* artist upload song route */}
        <Route path='/artist/upload' element={
          <ProtectedRoute allowedRole="artist">
            <UploadSong />
          </ProtectedRoute>
        } />

        {/* anyone can access login and register */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

      </Routes>
    </div>
  )
}

export default AppRoutes