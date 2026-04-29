// Navbar Component — Top navigation bar with search and user section
import React from 'react'
import { Search, Bell, ChevronLeft, ChevronRight, User } from 'lucide-react'

// Props: username — logged in user ka naam dikhayega
const Navbar = ({ username = 'Guest' }) => {
  return (
    // Navbar container — sticky top, dark background
    <div className="w-full bg-gray-900 bg-opacity-95 px-6 py-4 flex items-center justify-between sticky top-0 z-10 border-b border-gray-800">

      {/* Left Section — Back/Forward navigation buttons */}
      <div className="flex items-center gap-3">
        <button className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full transition">
          <ChevronLeft size={18} />
        </button>
        <button className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full transition">
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Center Section — Search Bar */}
      <div className="flex items-center bg-gray-800 rounded-full px-4 py-2 gap-2 w-80 border border-gray-700 focus-within:border-green-500 transition">
        <Search size={16} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search songs, albums, artists..."
          className="bg-transparent text-white text-sm outline-none w-full placeholder-gray-500"
        />
      </div>

      {/* Right Section — Notification + User */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="text-gray-400 hover:text-white transition">
          <Bell size={20} />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-full cursor-pointer hover:bg-gray-700 transition">
          <div className="bg-green-500 rounded-full p-1">
            <User size={14} className="text-black" />
          </div>
          <span className="text-white text-sm font-medium">{username}</span>
        </div>
      </div>

    </div>
  )
}

export default Navbar