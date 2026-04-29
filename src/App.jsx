import React from 'react'
import { useLocation } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import Sidebar from './components/layout/Sidebar'
import Navbar from './components/layout/Navbar'
import Player from './components/layout/Player'

const App = () => {
  const location = useLocation()

  // dont show sidebar navbar and player on these pages
  const hideLayout = location.pathname === '/login' || 
location.pathname === '/register' ||
   location.pathname === '/artist/dashboard' ||
   location.pathname==='/artist/upload'

  return (
    // main wrapper, flex so sidebar and content sit side by side
    <div className="flex bg-black min-h-screen">

      {/* sidebar only shows when user is on main pages */}
      {!hideLayout && <Sidebar />}

      {/* this div holds navbar, page content and player */}
      <div className="flex flex-col flex-1">

        {/* navbar only visible on main pages not on auth pages */}
        {!hideLayout && <Navbar />}

        {/* all the pages will render inside this div */}
        <div className="flex-1 overflow-y-auto pb-24">
          <AppRoutes />
        </div>

        {/* player sticks to bottom, hide on login register and artist dashboard */}
        {!hideLayout && <Player />}

      </div>

    </div>
  )
}

export default App