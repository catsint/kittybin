import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)
  const { login, error: authError } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Form validation
    if (!username.trim()) {
      setLocalError('Username is required')
      return
    }

    if (!password) {
      setLocalError('Password is required')
      return
    }

    setLoading(true)
    setLocalError(null)

    try {
      await login(username, password)
      // Redirect to home page on success
      navigate('/')
    } catch (err) {
      // Error is handled in AuthContext
      setLoading(false)
    }
  }

  // Display either local form validation errors or auth errors from the context
  const error = localError || authError

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Login</h1>

      {error && (
        <div className="bg-red-900/30 border border-red-500 text-red-400 p-4 mb-4 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label htmlFor="username" className="block mb-1">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control"
            placeholder="Enter your username"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="block mb-1">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            placeholder="Enter your password"
            disabled={loading}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="btn-submit"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <Link to="/register" className="text-blue-400 hover:underline">
            Need an account? Sign up
          </Link>
        </div>
      </form>

      {/* For demo purposes */}
      <div className="mt-8 p-4 bg-gray-800 rounded">
        <h2 className="text-lg font-bold mb-2">Demo Accounts</h2>
        <p className="mb-2">You can use any of these accounts to log in:</p>

        <ul className="list-disc pl-5 space-y-1">
          <li><strong>User:</strong> username: bluedeep, password: password123</li>
          <li><strong>Moderator:</strong> username: charge, password: moderator123</li>
          <li><strong>Admin:</strong> username: b1narie, password: admin123</li>
        </ul>

        <p className="mt-2 text-xs opacity-70">Note: This is a demo application. In a real application, passwords would be securely hashed and never stored in plain text.</p>
      </div>
    </div>
  )
}

export default Login
