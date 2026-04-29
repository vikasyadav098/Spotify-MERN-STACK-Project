import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../api/axios'

const Home = () => {
  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get('/api/music/albums')
        setAlbums(response.data.albums)
        setLoading(false)
      } catch (err) {
        setError("Albums are not loading, try again later")
        setLoading(false)
      }
    }
    fetchAlbums()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-green-500 rounded-full p-2">
            <span className="text-xl">🎵</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-wide">Albums</h1>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center min-h-[50vh]">
            <p className="text-gray-400 text-lg animate-pulse">⏳ Loading albums...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="bg-red-500 bg-opacity-10 border border-red-500 text-red-400 text-sm p-4 rounded-lg">
              ⚠️ {error}
            </div>
          </div>
        )}

        {/* Albums Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {albums.map((album) => (
              <Link to={`/albums/${album._id}`} key={album._id}>
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 hover:bg-gray-800 hover:border-green-500 transition-all duration-200 cursor-pointer group">

                  {/* Cover Image Placeholder */}
                  <div className="w-full h-40 bg-gray-800 rounded-xl mb-4 flex items-center justify-center group-hover:bg-gray-700 transition">
                    <span className="text-5xl">🎵</span>
                  </div>

                  <h2 className="text-white font-bold text-lg group-hover:text-green-400 transition">{album.title}</h2>
                  <p className="text-gray-400 text-sm mt-1">{album.artist.username}</p>
                  <p className="text-gray-600 text-xs mt-2">{album.musics.length} songs</p>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default Home