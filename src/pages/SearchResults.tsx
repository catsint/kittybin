import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { searchPastes, type Paste } from '../data/mockData'

const SearchResults = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [results, setResults] = useState<Paste[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (query) {
      setLoading(true)
      const searchResults = searchPastes(query)
      setResults(searchResults)
    } else {
      setResults([])
    }
    setLoading(false)
  }, [query])

  if (loading) {
    return <div className="text-center py-8">Searching...</div>
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Search Results</h1>
        {query && (
          <p className="opacity-70">
            Found {results.length} {results.length === 1 ? 'result' : 'results'} for: "{query}"
          </p>
        )}
      </div>

      {results.length === 0 ? (
        <div className="py-4">
          <p>No results found{query ? ` for "${query}"` : ''}.</p>
          {query && (
            <p className="mt-2">
              Try different keywords or{' '}
              <Link to="/add-paste" className="hover:underline">
                add a new paste
              </Link>
              .
            </p>
          )}
        </div>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left">
              <th className="py-2 px-4">Title</th>
              <th className="py-2 px-4">Views</th>
              <th className="py-2 px-4">Comments</th>
              <th className="py-2 px-4">Author</th>
              <th className="py-2 px-4">Added</th>
            </tr>
          </thead>
          <tbody>
            {results.map((paste) => (
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

export default SearchResults
