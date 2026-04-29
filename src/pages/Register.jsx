import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../api/axios'



const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role:'user',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await axios.post('/api/auth/register', formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Register failed. Please try again.');
      setLoading(false);
    }
  };


 return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center px-4">
      <div className="bg-gray-900 border border-gray-800 shadow-2xl p-10 rounded-2xl w-full max-w-md">

        {/* Logo + Title */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-green-500 rounded-full p-4 mb-4">
            <span className="text-3xl">🎵</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-wide">Create Account</h1>
          <p className="text-gray-400 text-sm mt-1">Create your new account</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500 bg-opacity-10 border border-red-500 text-shadow-black text-sm p-3 rounded-lg mb-4">
            ⚠️ {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-gray-400 text-sm">Username</label>
            
            <input
              type="text"
              name="username"
              placeholder="Enter your username...."
              value={formData.username}
              
              onChange={handleChange}
              className="bg-gray-800 text-white p-3 rounded-lg outline-none border border-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500 transition"
            />
             <label className="text-gray-400 text-sm">I am a</label>
  <select
    name="role"
    value={formData.role}
    onChange={handleChange}
    className="bg-gray-800 text-white p-3 rounded-lg outline-none border border-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500 transition"
  >
    <option value="user">User — I want to listen music</option>
    <option value="artist">Artist — I want to upload music</option>
  </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-400 text-sm">Email</label>
            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-800 text-white p-3 rounded-lg outline-none border border-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500 transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-400 text-sm">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="bg-gray-800 text-white p-3 rounded-lg outline-none border border-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-green-500 text-black font-bold p-3 rounded-lg hover:bg-green-400 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? '⏳ Registering...' : 'Register →'}
          </button>
        </form>

        {/* Footer */}
        <p className="text-gray-500 text-sm text-center mt-6">
          Already have account ?{' '}
          <a href="/login" className="text-green-400 hover:text-green-300 font-semibold transition">
            Login here
          </a>
        </p>

      </div>
    </div>
  );
};

export default Register;
