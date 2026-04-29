import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlbumCard from "../components/album/AlbumCard";
import axios from "../api/axios";
import { Music2, Disc3, LogOut, Plus, TrendingUp, Clock, Bell } from "lucide-react";

export default function ArtistDashboard() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNotif, setShowNotif] = useState(false);
  const [activeTab, setActiveTab] = useState("albums");
  const navigate = useNavigate();

  // grabbing user from storage
  const user = JSON.parse(localStorage.getItem('user'));

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning 🌅" :
    hour < 18 ? "Good Afternoon ☀️" :
    "Good Evening 🌙";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const albumsRes = await axios.get("/api/music/albums");
        setAlbums(albumsRes.data.albums);
      } catch (err) {
        console.error(err);
        setError("couldnt load data, try refreshing maybe");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // clear everything and go back to login
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-red-950 to-gray-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-red-950 to-gray-950 text-white">

      {/* navbar at top */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-red-900 bg-black bg-opacity-40 backdrop-blur-sm sticky top-0 z-10">

        {/* logo section */}
        <div className="flex items-center gap-2">
          <div className="bg-red-500 rounded-full p-2">
            <Music2 size={20} className="text-white" />
          </div>
          <span className="text-xl font-extrabold tracking-wide">Spotify</span>
          <span className="text-red-400 text-xs border border-red-400 px-2 py-0.5 rounded-full ml-2">
            Artist Studio
          </span>
        </div>

        {/* right side buttons */}
        <div className="flex items-center gap-4">

          {/* notification bell with dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotif(!showNotif)}
              className="relative bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition"
            >
              <Bell size={18} className="text-gray-400" />
              {/* red dot for notif */}
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* notif dropdown */}
            {showNotif && (
              <div className="absolute right-0 mt-2 w-64 bg-gray-900 border border-red-900 rounded-xl shadow-2xl p-4 z-20">
                <p className="text-white font-semibold text-sm mb-3">Notifications</p>
                <div className="flex flex-col gap-2">
                  <div className="bg-gray-800 rounded-lg p-3">
                    <p className="text-gray-300 text-xs">🎵 Your album got 10 new plays!</p>
                    <p className="text-gray-600 text-xs mt-1">2 hours ago</p>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3">
                    <p className="text-gray-300 text-xs">🔥 Trending in your genre</p>
                    <p className="text-gray-600 text-xs mt-1">5 hours ago</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* user info badge */}
          <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full border border-red-900">
            <div className="bg-red-500 rounded-full p-1">
              <span className="text-xs">🎤</span>
            </div>
            <span className="text-white text-sm font-medium">
              {user?.username || 'Artist'}
            </span>
            <span className="text-red-400 text-xs border border-red-400 px-2 py-0.5 rounded-full ml-1">
              Artist
            </span>
          </div>

          {/* logout button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-gray-800 hover:bg-red-600 hover:text-white text-gray-400 px-4 py-2 rounded-full transition-all duration-200"
          >
            <LogOut size={16} />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>

      <div className="px-8 py-8">

        {/* greeting section */}
        <div className="mb-10 bg-gradient-to-r from-red-900 to-transparent border border-red-900 rounded-2xl p-6">
          <p className="text-red-300 text-sm mb-1">{greeting}</p>
          <h1 className="text-4xl font-extrabold text-white">
            Welcome back, {user?.username}! 🎵
          </h1>
          <p className="text-gray-400 mt-2 text-sm">
            Manage your albums and tracks from here
          </p>
        </div>

        {/* stats cards row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">

          {/* total albums */}
          <div className="bg-gray-900 border border-red-900 rounded-2xl p-5 flex items-center gap-4 hover:border-red-500 transition">
           <div className="bg-red-500/20 p-3 rounded-xl">
             <Disc3 size={24} className="text-red-400" stroke="currentColor" />
            </div>
            <div>
              <p className="text-gray-400 text-xs">Total Albums</p>
              <p className="text-white text-2xl font-bold">{albums.length}</p>
            </div>
          </div>

          {/* total songs */}
          <div className="bg-gray-900 border border-red-900 rounded-2xl p-5 flex items-center gap-4 hover:border-red-500 transition">
            <div className="bg-red-500/20 p-3 rounded-xl">
              <Music2 size={24} className="text-red-400" stroke="currentColor" />
            </div>
            <div>
              <p className="text-gray-400 text-xs">Total Songs</p>
              <p className="text-white text-2xl font-bold">
                {albums.reduce((acc, album) => acc + album.musics.length, 0)}
              </p>
            </div>
          </div>

          {/* trending stat - static for now */}
          <div className="bg-gray-900 border border-red-900 rounded-2xl p-5 flex items-center gap-4 hover:border-red-500 transition">
            <div className="bg-red-500/20 p-3 rounded-xl">
              <TrendingUp size={24} className="text-red-400" stroke="currentColor" />
            </div>
            <div>
              <p className="text-gray-400 text-xs">Total Plays</p>
              <p className="text-white text-2xl font-bold">1.2k</p>
            </div>
          </div>

          {/* upload new song card */}
      <div
  onClick={() => navigate('/artist/upload')}
  className="bg-gray-900 border border-red-900 rounded-2xl p-5 flex items-center gap-4 cursor-pointer hover:border-red-500 transition group"
>
  <div className="bg-red-500/20 p-3 rounded-xl group-hover:bg-red-500/40 transition">
    <Plus size={24} stroke="currentColor" className="text-red-400" />
  </div>
  <div>
    <p className="text-gray-400 text-xs">Quick Action</p>
    <p className="text-white text-sm font-bold">Upload Song</p>
  </div>
</div>

        </div>

        {/* tab switcher */}
        <div className="flex gap-2 mb-6 bg-gray-900 border border-red-900 p-1 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab('albums')}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 
              ${activeTab === 'albums'
                ? 'bg-red-500 text-white'
                : 'text-gray-400 hover:text-white'
              }`}
          >
            🎵 Albums
          </button>
          <button
            onClick={() => setActiveTab('recent')}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200
              ${activeTab === 'recent'
                ? 'bg-red-500 text-white'
                : 'text-gray-400 hover:text-white'
              }`}
          >
            <Clock size={14} className="inline mr-1" />
            Recent Activity
          </button>
        </div>

        {/* error message if api fails */}
        {error && (
          <div className="bg-red-500 bg-opacity-10 border border-red-500 text-black text-sm p-4 rounded-lg mb-6">
            ⚠️ {error}
          </div>
        )}

        {/* albums tab content */}
        {activeTab === 'albums' && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Your Albums</h2>
              <button
                onClick={() => navigate('/artist/create-album')}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-400 text-white font-bold px-4 py-2 rounded-full transition-all duration-200 text-sm active:scale-95"
              >
                <Plus size={16} />
                New Album
              </button>
            </div>

            {/* empty state */}
            {albums.length === 0 ? (
              <div className="flex flex-col items-center justify-center bg-gray-900 border border-red-900 rounded-2xl p-12">
                <span className="text-5xl mb-4">🎵</span>
                <p className="text-gray-400 text-lg font-medium">No albums yet</p>
                <p className="text-gray-600 text-sm mt-1">Create your first album!</p>
                <button
                  onClick={() => navigate('/artist/create-album')}
                  className="mt-4 bg-red-500 hover:bg-red-400 text-white font-bold px-6 py-2 rounded-full text-sm transition active:scale-95"
                >
                  + Create Album
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {albums.map((album) => (
                  <AlbumCard
                    key={album._id}
                    _id={album._id}
                    title={album.title}
                    artist={album.artist}
                    musics={album.musics}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* recent activity tab */}
        {activeTab === 'recent' && (
          <div className="bg-gray-900 border border-red-900 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
            <div className="flex flex-col gap-3">
              {/* static activity items for now */}
              {[
                { icon: '🎵', text: 'You uploaded a new song', time: '2 hours ago' },
                { icon: '💿', text: 'New album created', time: '1 day ago' },
                { icon: '🔥', text: 'Your song is trending', time: '2 days ago' },
                { icon: '👥', text: '5 new followers', time: '3 days ago' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-gray-800 hover:bg-gray-700 p-4 rounded-xl transition cursor-pointer border border-transparent hover:border-red-900"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{item.text}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}