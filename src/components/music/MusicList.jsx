import React from 'react'
import SongCard from './SongCard'

const MusicList = ({ songs = [], onPlay }) => {
  return (
    <div className="flex flex-col w-full">

      <div className="flex items-center gap-4 px-4 py-2 border-b border-gray-800 mb-2">
        <span className="text-gray-500 text-xs w-6">#</span>
        <span className="text-gray-500 text-xs flex-1">TITLE</span>
        <span className="text-gray-500 text-xs">DURATION</span>
      </div>

      {songs.length === 0 ? (
        <p className="text-gray-500 text-sm px-4 py-6">No songs available</p>
      ) : (
        songs.map((song, index) => (
          <SongCard
            key={song._id}
            index={index + 1}
            title={song.title}
            artist={song.artist?.username || 'Unknown Artist'}
            cover={song.cover || null}
            duration={song.duration || ''}
            onPlay={() => onPlay && onPlay(song)}
          />
        ))
      )}

    </div>
  )
}

export default MusicList