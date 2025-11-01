import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider } from './contexts/AuthContext'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import PasteView from './pages/PasteView'
import AddPaste from './pages/AddPaste'
import UserProfile from './pages/UserProfile'
import SearchResults from './pages/SearchResults'
import Login from './pages/Login'
import Register from './pages/Register'
import TopPastes from './pages/TopPastes'
import HallOfAutism from './pages/HallOfAutism'

// Define routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'paste/:id',
        element: <PasteView />
      },
      {
        path: 'add-paste',
        element: <AddPaste />
      },
      {
        path: 'user/:username',
        element: <UserProfile />
      },
      {
        path: 'search',
        element: <SearchResults />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'top-pastes',
        element: <TopPastes />
      },
      {
        path: 'hall-of-autism',
        element: <HallOfAutism />
      },
      // Placeholder routes for other pages - will redirect to home for now
      {
        path: '*',
        element: <HomePage />
      }
    ]
  }
])

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element not found')

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
)
