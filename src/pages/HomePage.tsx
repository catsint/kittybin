import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getPastes, type Paste } from '../data/mockData'

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [pastes, setPastes] = useState<Paste[]>([])
  const [totalPastes, setTotalPastes] = useState(0)
  const limit = 10

  useEffect(() => {
    const fetchPastes = () => {
      const { pastes: fetchedPastes, total } = getPastes(currentPage, limit)
      setPastes(fetchedPastes)
      setTotalPastes(total)
      setTotalPages(Math.ceil(total / limit))
    }

    fetchPastes()
  }, [currentPage])

  // Function to handle pagination
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      window.scrollTo(0, 0)
    }
  }

  // Generate pagination buttons
  const renderPagination = () => {
    const buttons = []

    // Previous button
    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        className="px-2 py-1 bg-gray-800 text-white border border-gray-700"
        disabled={currentPage === 1}
      >
        &lt;
      </button>
    )

    // First page
    buttons.push(
      <button
        key={1}
        onClick={() => handlePageChange(1)}
        className={`px-2 py-1 ${currentPage === 1 ? 'bg-gray-700' : 'bg-gray-800'} text-white border border-gray-700`}
      >
        1
      </button>
    )

    // Calculate visible page range
    const startPage = Math.max(2, currentPage - 2)
    const endPage = Math.min(totalPages - 1, currentPage + 2)

    // Add ellipsis if needed
    if (startPage > 2) {
      buttons.push(
        <span key="ellipsis-start" className="px-2 py-1 bg-gray-800 text-white border border-gray-700">...</span>
      )
    }

    // Page buttons
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-2 py-1 ${currentPage === i ? 'bg-gray-700' : 'bg-gray-800'} text-white border border-gray-700`}
        >
          {i}
        </button>
      )
    }

    // Add ellipsis if needed
    if (endPage < totalPages - 1) {
      buttons.push(
        <span key="ellipsis-end" className="px-2 py-1 bg-gray-800 text-white border border-gray-700">...</span>
      )
    }

    // Last page button (if needed)
    if (totalPages > 1) {
      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`px-2 py-1 ${currentPage === totalPages ? 'bg-gray-700' : 'bg-gray-800'} text-white border border-gray-700`}
        >
          {totalPages}
        </button>
      )
    }

    // Next button
    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        className="px-2 py-1 bg-gray-800 text-white border border-gray-700"
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    )

    return buttons
  }

  // Separate pinned pastes from regular pastes
  const pinnedPastes = pastes.filter(paste => paste.pinned)
  const regularPastes = pastes.filter(paste => !paste.pinned)

  return (
    <div>
      {/* Pagination Info */}
      <div className="text-center mb-4">
        <p>Showing {pastes.length} (of {totalPastes} total) pastes</p>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mb-6 space-x-1">
        {renderPagination()}
      </div>

      {/* Pinned Pastes */}
      {pinnedPastes.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-2">Pinned Pastes</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left">
                <th className="py-2 px-4">Title</th>
                <th className="py-2 px-4">Comments</th>
                <th className="py-2 px-4">Views</th>
                <th className="py-2 px-4">Created by</th>
                <th className="py-2 px-4">Added</th>
              </tr>
            </thead>
            <tbody>
              {pinnedPastes.map((paste) => (
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
                  <td className="py-2 px-4">{paste.comments}</td>
                  <td className="py-2 px-4">{paste.views}</td>
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
        </div>
      )}

      {/* Regular Pastes */}
      {regularPastes.length > 0 && (
        <div>
          <h2 className="text-lg font-bold mb-2">Recent Pastes</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left">
                <th className="py-2 px-4">Title</th>
                <th className="py-2 px-4">Comments</th>
                <th className="py-2 px-4">Views</th>
                <th className="py-2 px-4">Created by</th>
                <th className="py-2 px-4">Added</th>
              </tr>
            </thead>
            <tbody>
              {regularPastes.map((paste) => (
                <tr key={paste.id} className="border-t border-gray-800">
                  <td className="py-2 px-4">
                    <Link to={`/paste/${paste.id}`} className="hover:underline">
                      {paste.title}
                    </Link>
                  </td>
                  <td className="py-2 px-4">{paste.comments}</td>
                  <td className="py-2 px-4">{paste.views}</td>
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
        </div>
      )}

      {/* Bottom Pagination */}
      <div className="flex justify-center mt-6 space-x-1">
        {renderPagination()}
      </div>
    </div>
  )
}

export default HomePage
