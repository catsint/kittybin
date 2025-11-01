import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getFeaturedPastes, Paste } from '../data/mockData'

const HallOfAutism = () => {
  const [featuredPastes, setFeaturedPastes] = useState<Paste[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const pastes = getFeaturedPastes()
    setFeaturedPastes(pastes)
    setLoading(false)
  }, [])

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Hall of Autism</h1>
      <p className="mb-6 opacity-70">The best and most entertaining pastes from across the site.</p>

      {featuredPastes.length === 0 ? (
        <p>No featured pastes found.</p>
      ) : (
        <div className="space-y-8">
          {featuredPastes.map((paste) => (
            <div
              key={paste.id}
              className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
                <Link
                  to={`/paste/${paste.id}`}
                  className="text-lg font-bold hover:underline"
                >
                  {paste.title}
                </Link>
                <div className="text-sm opacity-70">Posted by: <Link to={`/user/${paste.author}`} className="hover:underline">{paste.author}</Link></div>
              </div>

              <div className="px-6 py-4">
                <div className="whitespace-pre-wrap mb-4 font-mono">
                  {/* Show a preview of the content, limited to 150 chars */}
                  {paste.content.length > 150
                    ? `${paste.content.slice(0, 150)}...`
                    : paste.content
                  }
                </div>
                <Link
                  to={`/paste/${paste.id}`}
                  className="text-blue-400 text-sm hover:underline"
                >
                  Read Full Paste &rarr;
                </Link>
              </div>

              <div className="px-6 py-3 bg-gray-800 text-sm">
                <div className="flex space-x-4">
                  <div>
                    <span className="opacity-70">Views:</span> {paste.views}
                  </div>
                  <div>
                    <span className="opacity-70">Comments:</span> {paste.comments}
                  </div>
                  <div>
                    <span className="opacity-70">Added:</span> {paste.added}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 p-4 bg-gray-800/50 border border-gray-700 rounded">
        <h2 className="text-lg font-bold mb-2">What is the Hall of Autism?</h2>
        <p className="mb-2">
          The Hall of Autism showcases the most entertaining, hilarious, and facepalm-worthy pastes on Doxbin.
          These are the gems where users have demonstrated exceptional levels of cringe, delusion, or simply outstanding humor.
        </p>
        <p>
          Moderators regularly review pastes and feature the best ones here. Enjoy the collection of human folly and comedy!
        </p>
      </div>
    </div>
  )
}

export default HallOfAutism
