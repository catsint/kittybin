import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)
  const { register, error: authError } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Form validation
    if (!username.trim()) {
      setLocalError('Username is required')
      return
    }

    if (username.length < 3) {
      setLocalError('Username must be at least 3 characters')
      return
    }

    if (!password) {
      setLocalError('Password is required')
      return
    }

    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters')
      return
    }

    if (password !== confirmPassword) {
      setLocalError('Passwords do not match')
      return
    }

    setLoading(true)
    setLocalError(null)

    try {
      await register(username, password, email || undefined)
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
      <h1 className="text-2xl font-bold mb-6">Create an Account</h1>

      {error && (
        <div className="bg-red-900/30 border border-red-500 text-red-400 p-4 mb-4 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label htmlFor="username" className="block mb-1">Username <span className="text-red-500">*</span></label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control"
            placeholder="Choose a username"
            disabled={loading}
            required
          />
          <p className="text-xs opacity-70 mt-1">Must be at least 3 characters.</p>
        </div>

        <div className="form-group">
          <label htmlFor="email" className="block mb-1">Email (optional)</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            placeholder="Enter your email (optional)"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="block mb-1">Password <span className="text-red-500">*</span></label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            placeholder="Create a password"
            disabled={loading}
            required
          />
          <p className="text-xs opacity-70 mt-1">Must be at least 6 characters.</p>
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword" className="block mb-1">Confirm Password <span className="text-red-500">*</span></label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="form-control"
            placeholder="Confirm your password"
            disabled={loading}
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="btn-submit"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>

          <Link to="/login" className="text-blue-400 hover:underline">
            Already have an account? Login
          </Link>
        </div>
      </form>

      <div className="mt-4">
        <p className="text-sm opacity-70">
          By registering, you agree to the <Link to="/tos" className="text-blue-400 hover:underline">Terms of Service</Link>.
        </p>
      </div>
    </div>
  )
}

export default Register
