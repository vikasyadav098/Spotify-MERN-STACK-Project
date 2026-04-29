// Player Component — Bottom music player like Spotify
import React, { useState } from 'react'
import {
  Play, Pause, SkipBack, SkipForward,
  Volume2, Shuffle, Repeat, Heart
} from 'lucide-react'

// Props:
// currentSong — { title, artist, cover } currently playing song
// onNext — next song function
// onPrev — previous song function
const Player = ({ currentSong = null, onNext, onPrev }) => {

  // Local states for player controls
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(30)    // Progress bar value (0-100)
  const [volume, setVolume] = useState(70)         // Volume value (0-100)
  const [isLiked, setIsLiked] = useState(false)
  const [isShuffle, setIsShuffle] = useState(false)
  const [isRepeat, setIsRepeat] = useState(false)

  return (
    // Player container — fixed bottom, full width
    <div className="fixed bottom-0 left-0 right-0 bg-gray-950 border-t border-gray-800 px-6 py-3 flex items-center justify-between z-50">

      {/* Left Section — Current Song Info */}
      <div className="flex items-center gap-4 w-72">
        {currentSong ? (
          <>
            {/* Song Cover */}
            <div className="w-14 h-14 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
              {currentSong.cover
                ? <img src={currentSong.cover} alt={currentSong.title} className="w-full h-full rounded-lg object-cover" />
                : <span className="text-2xl">🎵</span>
              }
            </div>
            {/* Song Details */}
            <div className="flex flex-col">
              <span className="text-white text-sm font-semibold truncate">{currentSong.title}</span>
              <span className="text-gray-400 text-xs truncate">{currentSong.artist}</span>
            </div>
            {/* Like Button */}
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`ml-2 transition ${isLiked ? 'text-green-500' : 'text-gray-400 hover:text-white'}`}
            >
              <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
            </button>
          </>
        ) : (
          // Koi song select nahi hai tab
          <p className="text-gray-500 text-sm">No song selected</p>
        )}
      </div>

      {/* Center Section — Player Controls + Progress Bar */}
      <div className="flex flex-col items-center gap-2 flex-1 max-w-xl">

        {/* Control Buttons */}
        <div className="flex items-center gap-6">
          {/* Shuffle */}
          <button
            onClick={() => setIsShuffle(!isShuffle)}
            className={`transition ${isShuffle ? 'text-green-500' : 'text-gray-400 hover:text-white'}`}
          >
            <Shuffle size={18} />
          </button>

          {/* Previous */}
          <button
            onClick={onPrev}
            className="text-gray-400 hover:text-white transition"
          >
            <SkipBack size={22} />
          </button>

          {/* Play / Pause */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-white text-black rounded-full p-2 hover:scale-105 transition-transform"
          >
            {isPlaying ? <Pause size={22} /> : <Play size={22} />}
          </button>

          {/* Next */}
          <button
            onClick={onNext}
            className="text-gray-400 hover:text-white transition"
          >
            <SkipForward size={22} />
          </button>

          {/* Repeat */}
          <button
            onClick={() => setIsRepeat(!isRepeat)}
            className={`transition ${isRepeat ? 'text-green-500' : 'text-gray-400 hover:text-white'}`}
          >
            <Repeat size={18} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-3 w-full">
          <span className="text-gray-500 text-xs">1:20</span>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => setProgress(e.target.value)}
            className="w-full h-1 accent-green-500 cursor-pointer"
          />
          <span className="text-gray-500 text-xs">3:45</span>
        </div>

      </div>

      {/* Right Section — Volume Control */}
      <div className="flex items-center gap-3 w-48 justify-end">
        <Volume2 size={18} className="text-gray-400" />
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          className="w-24 h-1 accent-green-500 cursor-pointer"
        />
      </div>

    </div>
  )
}

export default Player