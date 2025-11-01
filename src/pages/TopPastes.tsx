import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getTopPastes, Paste } from '../data/mockData'

type SortOption = 'views' | 'comments'

const TopPastes = () => {
  const [pastes, setPastes] = useState<Paste[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState<SortOption>('views')

  useEffect(() => {
    setLoading(true)
    const topPastes = getTopPastes(sortBy, 20) // Get top 20 pastes
    setPastes(topPastes)
    setLoading(false)
  }, [sortBy])

  const handleSortChange = (option: SortOption) => {
    setSortBy(option)
  }

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Top Pastes</h1>

      <div className="mb-6 flex items-center">
        <span className="mr-4">Sort by:</span>
        <div className="flex space-x-2">
          <button
            onClick={() => handleSortChange('views')}
            className={`px-3 py-1 ${
              sortBy === 'views'
                ? 'bg-blue-900/30 border border-blue-500 text-blue-400'
                : 'bg-gray-800 border border-gray-700'
            }`}
          >
            Most Viewed
          </button>
          <button
            onClick={() => handleSortChange('comments')}
            className={`px-3 py-1 ${
              sortBy === 'comments'
                ? 'bg-blue-900/30 border border-blue-500 text-blue-400'
                : 'bg-gray-800 border border-gray-700'
            }`}
          >
            Most Commented
          </button>
        </div>
      </div>

      {pastes.length === 0 ? (
        <p>No pastes found.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left">
              <th className="py-2 px-4">Rank</th>
              <th className="py-2 px-4">Title</th>
              <th className="py-2 px-4">Views</th>
              <th className="py-2 px-4">Comments</th>
              <th className="py-2 px-4">Author</th>
              <th className="py-2 px-4">Added</th>
            </tr>
          </thead>
          <tbody>
            {pastes.map((paste, index) => (
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
                <td className="py-2 px-4">#{index + 1}</td>
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
                <td className="py-2 px-4">
                  <Link to={`/user/${paste.author}`} className="hover:underline">
                    {paste.author}
                  </Link>
                </td>
                <td className="py-2 px-4">{paste.added}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default TopPastes
