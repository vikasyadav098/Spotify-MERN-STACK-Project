import React from 'react'
import { Play } from 'lucide-react'

const SongCard = ({ title, artist, cover, duration, index, onPlay }) => {
  return (
    <div
      onClick={onPlay}
      className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-800 cursor-pointer group transition-all duration-200"
    >
      <div className="w-6 text-center flex-shrink-0">
        <span className="text-gray-500 text-sm group-hover:hidden">{index}</span>
        <Play size={16} className="text-white hidden group-hover:block" />
      </div>

      <div className="w-10 h-10 bg-gray-700 rounded flex items-center justify-center flex-shrink-0">
        {cover
          ? <img src={cover} alt={title} className="w-full h-full rounded object-cover" />
          : <span className="text-lg">🎵</span>
        }
      </div>

      <div className="flex flex-col flex-1 min-w-0">
        <span className="text-white text-sm font-medium truncate group-hover:text-green-400 transition">{title}</span>
        <span className="text-gray-400 text-xs truncate">{artist}</span>
      </div>

      <span className="text-gray-500 text-sm flex-shrink-0">{duration}</span>
    </div>
  )
}

export default SongCard