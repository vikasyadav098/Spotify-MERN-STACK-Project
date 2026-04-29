import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../api/axios'

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form submitted");
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/auth/login', formData);
      console.log(response.data);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token);

      // check role and send to right page
      if(response.data.user.role === 'artist'){
        navigate('/artist/dashboard')
      } else {
        navigate('/')
      }

      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center px-4">
      <div className="bg-gray-900 border border-gray-800 shadow-2xl p-10 rounded-2xl w-full max-w-md">

        <div className="flex flex-col items-center mb-8">
          <div className="bg-green-500 rounded-full p-4 mb-4">
            <span className="text-3xl">🎵</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-wide">Welcome Back</h1>
          <p className="text-gray-400 text-sm mt-1">Login to your account</p>
        </div>

        {error && (
          <div className="bg-red-500 bg-opacity-10 border border-red-500 text-black text-sm p-3 rounded-lg mb-4">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
            {loading ? '⏳ Logging in...' : 'Login →'}
          </button>
        </form>

        <p className="text-gray-500 text-sm text-center mt-6">
          Don't have Account?{' '}
          <a href="/register" className="text-green-400 hover:text-green-300 font-semibold transition">
            Register Here
          </a>
        </p>

      </div>
    </div>
  );
};

export default Login;