import { useState } from 'react'

function App() {
  const [totalPages] = useState(61)
  const [currentPage, setCurrentPage] = useState(1)

  const pinnedPastes = [
    { id: 'p1', title: 'zalgo poor retard', comments: 55, views: 2251, author: 'bluedeep', added: 'Apr 21st, 2022' },
    { id: 'p2', title: 'jackson bz', comments: 11, views: 957, author: 'stephen', added: 'Apr 15th, 2022' },
    { id: 'p3', title: 'How to Ensure Your Paste Stays Up', comments: '-', views: 44455, author: 'charge (Mod)', added: 'Nov 20th, 2020', highlight: 'green' },
    { id: 'p4', title: 'Transparency Report', comments: '-', views: 61756, author: 'b1narie', added: 'Jun 20th, 2020', highlight: 'red' },
  ]

  const regularPastes = [
    { id: 'r1', title: 'Die Modernd DXX3ED FZHEXYCY JEWELSXX', comments: 0, views: 8, author: 'Archive', added: 'Apr 26th, 2022' },
    { id: 'r2', title: 'Foxy ft Fortnite Directory', comments: 0, views: 9, author: 'Anonymous', added: 'Apr 26th, 2022' },
    { id: 'r3', title: 'how to make sure you paste stays up', comments: 0, views: 15, author: 'lurs', added: 'Apr 26th, 2022' },
    { id: 'r4', title: 'dennn', comments: 0, views: 13, author: 'lurs', added: 'Apr 26th, 2022' },
    { id: 'r5', title: '129292132', comments: 0, views: 12, author: 'Anonymous', added: 'Apr 26th, 2022' },
    { id: 'r6', title: 'Mark Zuckerberg Facebook CEO', comments: 0, views: 18, author: 'SeoMan1984', added: 'Apr 26th, 2022' },
  ]

  // Function to handle pagination
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
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

    // Page buttons
    for (let i = 2; i <= 5; i++) {
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

    // Ellipsis
    buttons.push(
      <span key="ellipsis" className="px-2 py-1 bg-gray-800 text-white border border-gray-700">...</span>
    )

    // Last page
    buttons.push(
      <button
        key={totalPages}
        onClick={() => handlePageChange(totalPages)}
        className={`px-2 py-1 ${currentPage === totalPages ? 'bg-gray-700' : 'bg-gray-800'} text-white border border-gray-700`}
      >
        {totalPages}
      </button>
    )

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

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-800">
        <nav className="flex justify-between px-4 py-2">
          <div className="flex space-x-6">
            <div className="text-white font-bold">Doxbin</div>
            <a href="/home" className="text-white">Home</a>
            <a href="/add-paste" className="text-white">Add Paste</a>
            <a href="/users" className="text-white">Users</a>
            <a href="/upgrades" className="text-white">Upgrades</a>
            <a href="/hall-of-autism" className="text-white">Hall of Autism</a>
            <a href="/tos" className="text-white">TOS</a>
            <a href="/telegram" className="text-white">Telegram</a>
          </div>
          <div className="flex space-x-4">
            <a href="/login" className="text-white">Login</a>
            <a href="/register" className="text-white">Register</a>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="py-8 px-4 max-w-4xl mx-auto">
        <div className="flex flex-col items-center mb-6">
          <img src="/images/devil-logo-red.svg" alt="Doxbin Logo" className="w-32 h-32 mb-4" />
          <h1 className="text-blue-400 text-xl font-bold mb-2">
            <a href="/telegram-group" className="hover:underline">Doxbin Telegram Group</a>
          </h1>
          <p className="text-blue-400 mb-1">
            <a href="/twitter" className="hover:underline">Official Doxbin Twitter</a>
          </p>
          <p className="text-blue-400">
            <a href="https://mirror.doxbin.org" className="hover:underline">Mirror.Doxbin.org</a>
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <p className="text-center mb-2">Search for a paste</p>
          <div className="flex justify-center">
            <input
              type="text"
              placeholder="Search for..."
              className="px-3 py-1 bg-gray-800 text-white border border-gray-700 mr-1"
            />
            <button className="px-3 py-1 bg-gray-800 text-white border border-gray-700">
              Search
            </button>
          </div>
        </div>

        {/* Pagination Info */}
        <div className="text-center mb-4">
          <p>Showing 150 (of 61890 total) pastes</p>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mb-6 space-x-1">
          {renderPagination()}
        </div>

        {/* Pinned Pastes */}
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
                      ? 'bg-green-900/30'
                      : paste.highlight === 'red'
                        ? 'bg-red-900/30'
                        : ''
                  }`}
                >
                  <td className="py-2 px-4">
                    <a href={`/paste/${paste.id}`} className={`hover:underline ${
                      paste.highlight === 'green'
                        ? 'text-green-500'
                        : paste.highlight === 'red'
                          ? 'text-red-500'
                          : 'text-white'
                    }`}>
                      {paste.title}
                    </a>
                  </td>
                  <td className="py-2 px-4">{paste.comments}</td>
                  <td className="py-2 px-4">{paste.views}</td>
                  <td className="py-2 px-4">
                    <a href={`/user/${paste.author}`} className="text-blue-400 hover:underline">
                      {paste.author}
                    </a>
                  </td>
                  <td className="py-2 px-4">{paste.added}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Regular Pastes */}
        <div>
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
                    <a href={`/paste/${paste.id}`} className="text-white hover:underline">
                      {paste.title}
                    </a>
                  </td>
                  <td className="py-2 px-4">{paste.comments}</td>
                  <td className="py-2 px-4">{paste.views}</td>
                  <td className="py-2 px-4">
                    <a href={`/user/${paste.author}`} className="text-blue-400 hover:underline">
                      {paste.author}
                    </a>
                  </td>
                  <td className="py-2 px-4">{paste.added}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

export default App
