import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../api/axios'

const AlbumDetails = () => {
  const { albumId } = useParams()
  const [album, setAlbum] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAlbumDetails = async () => {
      try {
        const response = await axios.get(`/api/music/albums/${albumId}`)
        setAlbum(response.data.album)
        setLoading(false)
      } catch (err) {
        setError("Can't load the album, Please try again later")
        setLoading(false)
      }
    }
    fetchAlbumDetails()
  }, [albumId])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-10">

      {loading && (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-gray-400 text-lg animate-pulse">⏳ Loading album...</p>
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-red-500 bg-opacity-10 border border-red-500 text-red-400 text-sm p-4 rounded-lg">
            ⚠️ {error}
          </div>
        </div>
      )}

      {!loading && !error && album && (
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 mb-10 bg-gray-900 border border-gray-800 p-8 rounded-2xl shadow-2xl">
            <div className="w-56 h-56 bg-gray-800 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
              <span className="text-7xl">🎵</span>
            </div>
            <div className="flex flex-col justify-center gap-3">
              <span className="text-green-500 text-sm font-semibold uppercase tracking-widest">Album</span>
              <h1 className="text-4xl font-extrabold text-white">{album.title}</h1>
              <div className="flex items-center gap-2 mt-1">
                <div className="bg-green-500 rounded-full p-1">
                  <span className="text-xs">🎤</span>
                </div>
                <p className="text-gray-300 font-semibold">{album.artist.username}</p>
              </div>
              <p className="text-gray-500 text-sm">{album.musics.length} songs</p>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-green-500 mb-4">🎵 Tracks</h2>
          <div className="flex flex-col gap-3">
            {album.musics.map((music, index) => (
              <div key={music._id} className="flex items-center gap-4 bg-gray-900 border border-gray-800 p-4 rounded-xl hover:bg-gray-800 hover:border-green-500 transition-all duration-200 cursor-pointer group">
                <span className="text-gray-500 w-6 text-sm group-hover:text-green-500 transition">{index + 1}</span>
                <span className="text-white flex-1 font-medium group-hover:text-green-400 transition">{music.title}</span>
                <a href={music.uri} target="_blank" rel="noreferrer" className="text-green-500 text-xs border border-green-500 px-3 py-1 rounded-full hover:bg-green-500 hover:text-black transition" onClick={(e) => e.stopPropagation()}>▶ Play</a>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}

export default AlbumDetails