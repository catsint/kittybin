import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { useAuth } from '../contexts/AuthContext'

const Layout = () => {
  const { theme, toggleTheme } = useTheme()
  const { isAuthenticated, currentUser, logout } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-800">
        <nav className="flex justify-between px-4 py-2">
          <div className="flex space-x-6 items-center">
            <div className="font-bold">
              <Link to="/" className="hover:no-underline">Doxbin</Link>
            </div>
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/add-paste" className="hover:underline">Add Paste</Link>
            <Link to="/top-pastes" className="hover:underline">Top Pastes</Link>
            <Link to="/hall-of-autism" className="hover:underline">Hall of Autism</Link>
            <Link to="/users" className="hover:underline">Users</Link>
          </div>
          <div className="flex space-x-4 items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to={`/user/${currentUser?.username}`} className="hover:underline">
                  {currentUser?.username}
                </Link>
                <button
                  onClick={handleLogout}
                  className="hover:underline"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link to="/login" className="hover:underline">Login</Link>
                <Link to="/register" className="hover:underline">Register</Link>
              </div>
            )}
            <button
              onClick={toggleTheme}
              className="theme-toggle px-2 py-1 ml-4"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
        </nav>
      </header>

      {/* Logo and Links */}
      <div className="flex flex-col items-center my-6">
        <Link to="/">
          <img src="/images/devil-logo-red.svg" alt="Doxbin Logo" className="w-32 h-32 mb-4 logo-image" />
        </Link>
        <h1 className="text-xl font-bold mb-2">
          <a href="https://t.me/doxbin" className="hover:underline" target="_blank" rel="noopener noreferrer">
            Doxbin Telegram Group
          </a>
        </h1>
        <p className="mb-1">
          <a href="https://twitter.com/doxbin" className="hover:underline" target="_blank" rel="noopener noreferrer">
            Official Doxbin Twitter
          </a>
        </p>
        <p>
          <a href="https://mirror.doxbin.org" className="hover:underline" target="_blank" rel="noopener noreferrer">
            Mirror.Doxbin.org
          </a>
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <p className="text-center mb-2">Search for a paste</p>
        <form onSubmit={handleSearch} className="flex justify-center">
          <input
            type="text"
            placeholder="Search for..."
            className="px-3 py-1 mr-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="px-3 py-1">
            Search
          </button>
        </form>
      </div>

      {/* Main Content */}
      <main className="px-4 max-w-4xl mx-auto pb-12">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
