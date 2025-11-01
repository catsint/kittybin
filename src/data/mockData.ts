// Types
export interface Paste {
  id: string
  title: string
  content: string
  author: string
  views: number
  comments: number | string
  commentsList?: Comment[]
  added: string
  pinned?: boolean
  highlight?: 'green' | 'red'
  featured?: boolean  // For Hall of Autism
}

export interface Comment {
  id: string
  pasteId: string
  author: string
  content: string
  timestamp: string
}

export interface User {
  id: string
  username: string
  password: string  // In a real app, we would never store plain text passwords
  email?: string
  joined: string
  role: 'user' | 'admin' | 'mod'
  totalPastes: number
  totalViews: number
  reputation: number
}

export interface AuthInfo {
  isAuthenticated: boolean
  currentUser: User | null
}

// Mock paste content
const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, nisl nisl tincidunt nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies aliquam, nisl nisl tincidunt nisl, eget ultricies nisl nisl eget nisl.

Nullam auctor, nisl eget ultricies aliquam, nisl nisl tincidunt nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies aliquam, nisl nisl tincidunt nisl, eget ultricies nisl nisl eget nisl.

Suspendisse potenti. In hac habitasse platea dictumst. Fusce eu nisl vitae quam placerat bibendum. Proin et augue ac dolor malesuada ultricies. Nulla facilisi. Nullam euismod, purus a euismod aliquam, lectus velit ultricies dui, vel ultricies magna velit nec eros.`

const markZuckerbergDox = `Full Name: Mark Elliot Zuckerberg
Title: Co-founder, Chairman and CEO of Meta Platforms
Born: May 14, 1984 (age 38)
Education: Harvard University (dropped out)
Net Worth: ~$67.3 billion (2022)
Spouse: Priscilla Chan (m. 2012)
Children: 3

CAREER INFORMATION:
- Founded Facebook in 2004
- Launched Facebook from Harvard dorm room with roommates
- CEO of Meta Platforms (formerly Facebook, Inc.)
- Acquired Instagram for $1 billion in 2012
- Acquired WhatsApp for $19 billion in 2014
- Launched Meta (company rebrand) in 2021

PUBLIC CONTROVERSIES:
- Cambridge Analytica scandal (2018)
- Congressional testimony on data privacy (2018)
- FTC fine of $5 billion (2019)
- Whistleblower Frances Haugen testimony (2021)

This is public information compiled from various publicly available sources.`

const dumbMeme = `I tried to create a joke about the friend zone
But I couldn't get in...

PWND!!! LULZ`

// Mock comments data
export const comments: Comment[] = [
  {
    id: 'c1',
    pasteId: 'p1',
    author: 'stephen',
    content: 'This is absolute gold lmao',
    timestamp: 'Apr 21st, 2022 - 15:23'
  },
  {
    id: 'c2',
    pasteId: 'p1',
    author: 'lurs',
    content: 'top kek',
    timestamp: 'Apr 22nd, 2022 - 09:12'
  },
  {
    id: 'c3',
    pasteId: 'p2',
    author: 'bluedeep',
    content: 'fr fr no cap',
    timestamp: 'Apr 16th, 2022 - 12:45'
  },
  {
    id: 'c4',
    pasteId: 'r6',
    author: 'b1narie',
    content: 'Impressive work.',
    timestamp: 'Apr 26th, 2022 - 18:34'
  }
]

// Mock pastes data
export const pastes: Paste[] = [
  {
    id: 'p1',
    title: 'zalgo poor retard',
    content: loremIpsum,
    author: 'bluedeep',
    views: 2251,
    comments: 2,
    commentsList: comments.filter(c => c.pasteId === 'p1'),
    added: 'Apr 21st, 2022',
    pinned: true
  },
  {
    id: 'p2',
    title: 'jackson bz',
    content: loremIpsum,
    author: 'stephen',
    views: 957,
    comments: 1,
    commentsList: comments.filter(c => c.pasteId === 'p2'),
    added: 'Apr 15th, 2022',
    pinned: true
  },
  {
    id: 'p3',
    title: 'How to Ensure Your Paste Stays Up',
    content: `1. Don't post illegal content\n2. Don't post personal information of minors\n3. Don't post spam\n4. Don't post copyrighted material\n5. Don't post anything that violates our TOS`,
    author: 'charge',
    views: 44455,
    comments: '-',
    added: 'Nov 20th, 2020',
    pinned: true,
    highlight: 'green'
  },
  {
    id: 'p4',
    title: 'Transparency Report',
    content: "Doxbin Transparency Report - June 2020\n\nRequests for user data: 12\nRequests complied with: 0\nPastes removed: 35\nAccounts banned: 17\n\nDoxbin does not store IP addresses or other personally identifiable information. We cannot and will not comply with requests for user data.",
    author: 'b1narie',
    views: 61756,
    comments: '-',
    added: 'Jun 20th, 2020',
    pinned: true,
    highlight: 'red'
  },
  {
    id: 'r1',
    title: 'Die Modernd DXX3ED FZHEXYCY JEWELSXX',
    content: loremIpsum,
    author: 'Archive',
    views: 8,
    comments: 0,
    added: 'Apr 26th, 2022'
  },
  {
    id: 'r2',
    title: 'Foxy ft Fortnite Directory',
    content: loremIpsum,
    author: 'Anonymous',
    views: 9,
    comments: 0,
    added: 'Apr 26th, 2022',
    featured: true
  },
  {
    id: 'r3',
    title: 'how to make sure you paste stays up',
    content: loremIpsum,
    author: 'lurs',
    views: 15,
    comments: 0,
    added: 'Apr 26th, 2022',
    featured: true
  },
  {
    id: 'r4',
    title: 'dennn',
    content: loremIpsum,
    author: 'lurs',
    views: 13,
    comments: 0,
    added: 'Apr 26th, 2022'
  },
  {
    id: 'r5',
    title: '129292132',
    content: loremIpsum,
    author: 'Anonymous',
    views: 12,
    comments: 0,
    added: 'Apr 26th, 2022'
  },
  {
    id: 'r6',
    title: 'Mark Zuckerberg Facebook CEO',
    content: markZuckerbergDox,
    author: 'SeoMan1984',
    views: 18,
    comments: 1,
    commentsList: comments.filter(c => c.pasteId === 'r6'),
    added: 'Apr 26th, 2022'
  },
  {
    id: 'h1',
    title: 'Friend Zone Joke',
    content: dumbMeme,
    author: 'retardAnon',
    views: 6969,
    comments: 42,
    added: 'Mar 15th, 2022',
    featured: true
  },
  {
    id: 'h2',
    title: 'i hacked the pentagon',
    content: "I HACKED THE PENTAGON!!!\n\nI used my terminal and typed \"hack pentagon\" and it worked! I am in the mainframe now!!!\n\nIM STEALING ALL THE NUCLEAR CODES!!!\n\nIMMA LAUNCH MISSILES AT MY SCHOOL!!!",
    author: 'script_kiddie_1337',
    views: 3812,
    comments: 27,
    added: 'Feb 10th, 2022',
    featured: true
  },
  {
    id: 'h3',
    title: 'i am anonymous',
    content: 'Hello everyone, I am Anonymous. I am Legion. I am the voice of the voiceless. I am the eyes of the blind. I am the ears of the deaf. I forgive not. I forget not. Expect me.',
    author: 'xXx_Anonymous_xXx',
    views: 5123,
    comments: 38,
    added: 'Jan 12th, 2022',
    featured: true
  }
]

// Mock users data with passwords
export const users: User[] = [
  {
    id: 'u1',
    username: 'bluedeep',
    password: 'password123',
    email: 'bluedeep@example.com',
    joined: 'Jan 15th, 2022',
    role: 'user',
    totalPastes: 7,
    totalViews: 3520,
    reputation: 42
  },
  {
    id: 'u2',
    username: 'stephen',
    password: 'password123',
    email: 'stephen@example.com',
    joined: 'Feb 3rd, 2022',
    role: 'user',
    totalPastes: 3,
    totalViews: 1205,
    reputation: 15
  },
  {
    id: 'u3',
    username: 'charge',
    password: 'moderator123',
    email: 'charge@example.com',
    joined: 'Jul 10th, 2019',
    role: 'mod',
    totalPastes: 22,
    totalViews: 98742,
    reputation: 320
  },
  {
    id: 'u4',
    username: 'b1narie',
    password: 'admin123',
    email: 'admin@example.com',
    joined: 'Jun 5th, 2019',
    role: 'admin',
    totalPastes: 35,
    totalViews: 142567,
    reputation: 512
  },
  {
    id: 'u5',
    username: 'lurs',
    password: 'password123',
    email: 'lurs@example.com',
    joined: 'Mar 20th, 2022',
    role: 'user',
    totalPastes: 2,
    totalViews: 28,
    reputation: 5
  },
  {
    id: 'u6',
    username: 'SeoMan1984',
    password: 'password123',
    email: 'seoman@example.com',
    joined: 'Apr 10th, 2022',
    role: 'user',
    totalPastes: 1,
    totalViews: 18,
    reputation: 2
  },
  {
    id: 'u7',
    username: 'Anonymous',
    password: 'password123',
    email: 'anon@example.com',
    joined: 'Jan 1st, 2022',
    role: 'user',
    totalPastes: 42,
    totalViews: 1256,
    reputation: 25
  },
  {
    id: 'u8',
    username: 'Archive',
    password: 'password123',
    email: 'archive@example.com',
    joined: 'Dec 15th, 2021',
    role: 'user',
    totalPastes: 5,
    totalViews: 127,
    reputation: 12
  },
  {
    id: 'u9',
    username: 'retardAnon',
    password: 'password123',
    email: 'retard@example.com',
    joined: 'Mar 1st, 2022',
    role: 'user',
    totalPastes: 3,
    totalViews: 7823,
    reputation: 13
  },
  {
    id: 'u10',
    username: 'script_kiddie_1337',
    password: 'password123',
    email: 'script@example.com',
    joined: 'Feb 5th, 2022',
    role: 'user',
    totalPastes: 8,
    totalViews: 4231,
    reputation: 7
  },
  {
    id: 'u11',
    username: 'xXx_Anonymous_xXx',
    password: 'password123',
    email: 'xanon@example.com',
    joined: 'Jan 5th, 2022',
    role: 'user',
    totalPastes: 12,
    totalViews: 6532,
    reputation: 22
  }
]

// Mock authentication state
let authState: AuthInfo = {
  isAuthenticated: false,
  currentUser: null
}

// Data access functions
export const getPastes = (page = 1, limit = 10): { pastes: Paste[], total: number } => {
  const pinnedPastes = pastes.filter(paste => paste.pinned)
  const regularPastes = pastes.filter(paste => !paste.pinned)

  const start = (page - 1) * limit
  const end = start + limit
  const paginatedPastes = regularPastes.slice(start, end)

  // If it's the first page, include pinned pastes
  const result = page === 1
    ? [...pinnedPastes, ...paginatedPastes].slice(0, limit)
    : paginatedPastes

  return {
    pastes: result,
    total: pastes.length
  }
}

export const getFeaturedPastes = (): Paste[] => {
  return pastes.filter(paste => paste.featured)
}

export const getTopPastes = (sortBy: 'views' | 'comments' = 'views', limit = 10): Paste[] => {
  // For comments sorting, convert string comments to 0 for proper sorting
  const sortedPastes = [...pastes].sort((a, b) => {
    if (sortBy === 'views') {
      return b.views - a.views
    }
    const commentsA = typeof a.comments === 'string' ? 0 : a.comments
    const commentsB = typeof b.comments === 'string' ? 0 : b.comments
    return commentsB - commentsA
  })

  return sortedPastes.slice(0, limit)
}

export const getPasteById = (id: string): Paste | undefined => {
  return pastes.find(paste => paste.id === id)
}

export const getUserByUsername = (username: string): User | undefined => {
  return users.find(user => user.username === username)
}

export const getUserPastes = (username: string): Paste[] => {
  return pastes.filter(paste => paste.author === username)
}

export const getUsers = (page = 1, limit = 10): { users: User[], total: number } => {
  const start = (page - 1) * limit
  const end = start + limit

  return {
    users: users.slice(start, end),
    total: users.length
  }
}

export const searchPastes = (query: string): Paste[] => {
  const lowerQuery = query.toLowerCase()
  return pastes.filter(paste =>
    paste.title.toLowerCase().includes(lowerQuery) ||
    paste.content.toLowerCase().includes(lowerQuery) ||
    paste.author.toLowerCase().includes(lowerQuery)
  )
}

// Get comments for a paste
export const getCommentsForPaste = (pasteId: string): Comment[] => {
  return comments.filter(comment => comment.pasteId === pasteId)
}

// Add a comment to a paste
export const addComment = (pasteId: string, author: string, content: string): Comment => {
  const paste = getPasteById(pasteId)
  if (!paste) {
    throw new Error('Paste not found')
  }

  const now = new Date()
  const formattedDate = `${now.toLocaleString('en-US', { month: 'short' })} ${now.getDate()}th, ${now.getFullYear()} - ${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`

  const newComment: Comment = {
    id: `c${comments.length + 1}`,
    pasteId,
    author,
    content,
    timestamp: formattedDate
  }

  comments.push(newComment)

  // Update comment count on the paste
  const commentCount = typeof paste.comments === 'string' ? 0 : paste.comments
  paste.comments = commentCount + 1

  // Add to commentsList of the paste if it exists
  if (paste.commentsList) {
    paste.commentsList.push(newComment)
  } else {
    paste.commentsList = [newComment]
  }

  return newComment
}

// For adding a new paste (mock implementation)
let nextPasteId = `r${pastes.length + 1}`

export const addPaste = (title: string, content: string, author: string = 'Anonymous'): Paste => {
  const currentDate = new Date()
  const formattedDate = `${currentDate.toLocaleString('en-US', { month: 'short' })} ${currentDate.getDate()}th, ${currentDate.getFullYear()}`

  const newPaste: Paste = {
    id: nextPasteId,
    title,
    content,
    author,
    views: 0,
    comments: 0,
    commentsList: [],
    added: formattedDate
  }

  pastes.push(newPaste)
  nextPasteId = `r${pastes.length + 1}`

  return newPaste
}

// Authentication functions
export const login = (username: string, password: string): AuthInfo => {
  const user = users.find(u => u.username === username && u.password === password)

  if (user) {
    authState = {
      isAuthenticated: true,
      currentUser: user
    }
  } else {
    throw new Error('Invalid username or password')
  }

  return authState
}

export const register = (username: string, password: string, email?: string): AuthInfo => {
  // Check if username already exists
  if (users.some(u => u.username === username)) {
    throw new Error('Username already exists')
  }

  const currentDate = new Date()
  const formattedDate = `${currentDate.toLocaleString('en-US', { month: 'short' })} ${currentDate.getDate()}th, ${currentDate.getFullYear()}`

  const newUser: User = {
    id: `u${users.length + 1}`,
    username,
    password,
    email,
    joined: formattedDate,
    role: 'user',
    totalPastes: 0,
    totalViews: 0,
    reputation: 0
  }

  users.push(newUser)

  // Automatically log in the new user
  authState = {
    isAuthenticated: true,
    currentUser: newUser
  }

  return authState
}

export const logout = (): void => {
  authState = {
    isAuthenticated: false,
    currentUser: null
  }
}

export const getAuthInfo = (): AuthInfo => {
  return { ...authState }
}
