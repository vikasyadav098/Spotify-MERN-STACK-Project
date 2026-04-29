// Sidebar Component — Left navigation panel like Spotify
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Search, Library, Music2 } from 'lucide-react'

const Sidebar = () => {
  // useLocation se pata chalega currently kaunsa page active hai
  const location = useLocation()

  // Navigation links ka array — easy to add more later
  const navLinks = [
    { path: '/', label: 'Home', icon: <Home size={22} /> },
    { path: '/search', label: 'Search', icon: <Search size={22} /> },
    { path: '/library', label: 'Your Library', icon: <Library size={22} /> },
  ]

  return (
    // Sidebar container — fixed left side, dark background
    <div className="w-64 min-h-screen bg-black text-white flex flex-col px-4 py-6 gap-6">

      {/* Logo Section */}
      <div className="flex items-center gap-2 px-2 mb-4">
        <div className="bg-green-500 rounded-full p-2">
          <Music2 size={22} className="text-black" />
        </div>
        <span className="text-xl font-extrabold tracking-wide">Spotify</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-1">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`flex items-center gap-4 px-3 py-3 rounded-lg font-medium transition-all duration-200
              ${location.pathname === link.path
                ? 'bg-gray-800 text-green-400'  // Active link styling
                : 'text-gray-400 hover:text-white hover:bg-gray-900'  // Inactive link styling
              }`}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Divider */}
      <div className="border-t border-gray-800 my-2" />

      {/* Recently Played Section — static for now */}
      <div className="flex flex-col gap-2 px-2">
        <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">Recently Played</p>
        {['Arijit Hits', 'Lofi Beats', '90s Bollywood'].map((item) => (
          <p key={item} className="text-gray-400 text-sm hover:text-white cursor-pointer transition">
            🎵 {item}
          </p>
        ))}
      </div>

    </div>
  )
}

export default Sidebar