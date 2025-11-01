import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getUserByUsername, getUserPastes, type User, type Paste } from '../data/mockData'

const UserProfile = () => {
  const { username } = useParams<{ username: string }>()
  const [user, setUser] = useState<User | null>(null)
  const [pastes, setPastes] = useState<Paste[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (username) {
      const fetchedUser = getUserByUsername(username)
      if (fetchedUser) {
        setUser(fetchedUser)
        setPastes(getUserPastes(username))
      } else {
        // User not found, redirect to home
        navigate('/')
      }
    }
    setLoading(false)
  }, [username, navigate])

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  if (!user) {
    return <div className="text-center py-8">User not found</div>
  }

  // Helper function to determine user badge class
  const getUserBadgeClass = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-900/30 text-red-400'
      case 'mod':
        return 'bg-green-900/30 text-green-400'
      default:
        return 'bg-gray-800 text-gray-400'
    }
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-2xl font-bold">{username}</h1>
          <span className={`px-2 py-1 text-sm rounded ${getUserBadgeClass(user.role)}`}>
            {user.role.toUpperCase()}
          </span>
        </div>

        <div className="text-sm mb-4">
          <span className="opacity-70">Joined:</span> {user.joined}
        </div>

        <div className="user-stats">
          <div className="stat-card">
            <div className="opacity-70">Total Pastes</div>
            <div className="stat-value">{user.totalPastes}</div>
          </div>

          <div className="stat-card">
            <div className="opacity-70">Total Views</div>
            <div className="stat-value">{user.totalViews}</div>
          </div>

          <div className="stat-card">
            <div className="opacity-70">Reputation</div>
            <div className="stat-value">{user.reputation}</div>
          </div>
        </div>
      </div>

      <div className="user-pastes">
        <h2 className="text-xl font-bold mb-4">Pastes by {username}</h2>

        {pastes.length === 0 ? (
          <p>No pastes found.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left">
                <th className="py-2 px-4">Title</th>
                <th className="py-2 px-4">Views</th>
                <th className="py-2 px-4">Comments</th>
                <th className="py-2 px-4">Added</th>
              </tr>
            </thead>
            <tbody>
              {pastes.map((paste) => (
                <tr
                  key={paste.id}
                  className={`border-t border-gray-800 ${
                    paste.highlight === 'green'
                      ? 'highlight-green'
                      : paste.highlight === 'red'
                        ? 'highlight-red'
                        : ''
                  }`}
                >
                  <td className="py-2 px-4">
                    <Link to={`/paste/${paste.id}`} className={`hover:underline ${
                      paste.highlight === 'green'
                        ? 'text-green'
                        : paste.highlight === 'red'
                          ? 'text-red'
                          : ''
                    }`}>
                      {paste.title}
                    </Link>
                  </td>
                  <td className="py-2 px-4">{paste.views}</td>
                  <td className="py-2 px-4">{paste.comments}</td>
                  <td className="py-2 px-4">{paste.added}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default UserProfile
