import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getPasteById, getCommentsForPaste, addComment, Paste, Comment } from '../data/mockData'
import { useAuth } from '../contexts/AuthContext'

const PasteView = () => {
  const { id } = useParams<{ id: string }>()
  const [paste, setPaste] = useState<Paste | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const { isAuthenticated, currentUser } = useAuth()

  useEffect(() => {
    if (id) {
      const fetchedPaste = getPasteById(id)
      if (fetchedPaste) {
        setPaste(fetchedPaste)

        // Get comments either from the paste or directly from the comments API
        const pasteComments = fetchedPaste.commentsList || getCommentsForPaste(id)
        setComments(pasteComments)
      } else {
        // Paste not found, redirect to home
        navigate('/')
      }
    }
    setLoading(false)
  }, [id, navigate])

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault()

    if (!isAuthenticated || !currentUser) {
      setError('You must be logged in to add a comment')
      return
    }

    if (!newComment.trim()) {
      setError('Comment cannot be empty')
      return
    }

    if (!id) return

    setSubmitting(true)
    setError(null)

    try {
      // Add the comment and get the updated comment
      const addedComment = addComment(id, currentUser.username, newComment)

      // Update the comments list
      setComments(prev => [...prev, addedComment])

      // Clear the form
      setNewComment('')
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Failed to add comment')
      }
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  if (!paste) {
    return <div className="text-center py-8">Paste not found</div>
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">{paste.title}</h1>
        <div className="flex flex-wrap gap-4 text-sm mb-4">
          <div>
            <span className="opacity-70">Author:</span>{' '}
            <Link to={`/user/${paste.author}`} className="hover:underline">
              {paste.author}
            </Link>
          </div>
          <div>
            <span className="opacity-70">Added:</span> {paste.added}
          </div>
          <div>
            <span className="opacity-70">Views:</span> {paste.views}
          </div>
          <div>
            <span className="opacity-70">Comments:</span> {comments.length}
          </div>
        </div>
      </div>

      <div className="paste-content">
        {paste.content}
      </div>

      <div className="mt-6 flex justify-between">
        <Link to="/" className="hover:underline">&larr; Back to Pastes</Link>
        <div className="space-x-4">
          <button className="px-3 py-1" onClick={() => navigator.clipboard.writeText(paste.content)}>
            Copy
          </button>
          <button className="px-3 py-1" onClick={() => window.open(`/paste/raw/${id}`, '_blank')}>
            Raw
          </button>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Comments ({comments.length})</h2>

        {error && (
          <div className="bg-red-900/30 border border-red-500 text-red-400 p-4 mb-4 rounded">
            {error}
          </div>
        )}

        {/* Add Comment Form */}
        <div className="mb-6">
          {isAuthenticated ? (
            <form onSubmit={handleAddComment} className="space-y-4">
              <div className="form-group">
                <label htmlFor="comment" className="block mb-1">Add a comment</label>
                <textarea
                  id="comment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="form-control"
                  rows={3}
                  placeholder="Enter your comment"
                  disabled={submitting}
                />
              </div>

              <button
                type="submit"
                className="btn-submit"
                disabled={submitting}
              >
                {submitting ? 'Posting...' : 'Post Comment'}
              </button>
            </form>
          ) : (
            <div className="p-4 bg-gray-800 rounded">
              <p>
                <Link to="/login" className="text-blue-400 hover:underline">Log in</Link> or{' '}
                <Link to="/register" className="text-blue-400 hover:underline">register</Link> to add a comment.
              </p>
            </div>
          )}
        </div>

        {/* Comments List */}
        {comments.length === 0 ? (
          <p className="py-4 opacity-70">No comments yet. Be the first to comment!</p>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="p-4 bg-gray-800/50 border border-gray-700 rounded"
              >
                <div className="flex justify-between mb-2">
                  <Link
                    to={`/user/${comment.author}`}
                    className="font-bold hover:underline"
                  >
                    {comment.author}
                  </Link>
                  <span className="text-sm opacity-70">{comment.timestamp}</span>
                </div>
                <p className="whitespace-pre-wrap">{comment.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default PasteView
