import React from 'react'
import { Link } from 'react-router-dom'
import { Play } from 'lucide-react'

const AlbumCard = ({ _id, title, artist, musics = [] }) => {
  return (
    <Link to={`/albums/${_id}`}>
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 hover:bg-gray-800 hover:border-green-500 transition-all duration-200 cursor-pointer group relative">

        {/* album cover placeholder */}
        <div className="w-full aspect-square bg-gray-800 rounded-xl mb-4 flex items-center justify-center group-hover:bg-gray-700 transition relative overflow-hidden">
          <span className="text-5xl">🎵</span>

          {/* play button shows on hover */}
          <div className="absolute bottom-2 right-2 bg-green-500 rounded-full p-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200 shadow-lg">
            <Play size={16} className="text-black" fill="black" />
          </div>
        </div>

        {/* album info */}
        <h3 className="text-white font-bold text-base truncate group-hover:text-green-400 transition">
          {title}
        </h3>
        <p className="text-gray-400 text-sm mt-1 truncate">
          {artist?.username}
        </p>
        <p className="text-gray-600 text-xs mt-1">
          {musics.length} songs
        </p>

      </div>
    </Link>
  )
}

export default AlbumCard