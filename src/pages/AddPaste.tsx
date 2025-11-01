import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addPaste } from '../data/mockData'

const AddPaste = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!title.trim()) {
      setError('Title is required')
      return
    }

    if (!content.trim()) {
      setError('Content is required')
      return
    }

    setSubmitting(true)
    setError('')

    try {
      // Use the author provided or default to Anonymous
      const newPaste = addPaste(title, content, author.trim() || 'Anonymous')

      // Navigate to the new paste
      navigate(`/paste/${newPaste.id}`)
    } catch (err) {
      setError('Failed to create paste. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Add New Paste</h1>

      <div className="form-container">
        {error && (
          <div className="bg-red-900/30 border border-red-500 text-red-400 p-4 mb-4 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter paste title"
              disabled={submitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="author">Author (optional)</label>
            <input
              type="text"
              id="author"
              className="form-control"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Leave blank to post as Anonymous"
              disabled={submitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              className="form-control"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste your content here..."
              rows={15}
              disabled={submitting}
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="btn-submit"
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Add Paste'}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <h2 className="text-lg font-bold mb-2">Paste Rules</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Don't post illegal content</li>
            <li>Don't post personal information of minors</li>
            <li>Don't post spam</li>
            <li>Don't post copyrighted material</li>
            <li>Don't post anything that violates our TOS</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AddPaste
