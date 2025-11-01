import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { getAuthInfo, login as loginApi, logout as logoutApi, register as registerApi, AuthInfo, User } from '../data/mockData'

interface AuthContextType {
  isAuthenticated: boolean
  currentUser: User | null
  login: (username: string, password: string) => Promise<void>
  register: (username: string, password: string, email?: string) => Promise<void>
  logout: () => void
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authInfo, setAuthInfo] = useState<AuthInfo>({ isAuthenticated: false, currentUser: null })
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Load auth state on mount
    const initialAuthInfo = getAuthInfo()
    setAuthInfo(initialAuthInfo)
  }, [])

  const login = async (username: string, password: string) => {
    try {
      setError(null)
      const newAuthInfo = loginApi(username, password)
      setAuthInfo(newAuthInfo)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unknown error occurred during login')
      }
      throw err
    }
  }

  const register = async (username: string, password: string, email?: string) => {
    try {
      setError(null)
      const newAuthInfo = registerApi(username, password, email)
      setAuthInfo(newAuthInfo)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unknown error occurred during registration')
      }
      throw err
    }
  }

  const logout = () => {
    logoutApi()
    setAuthInfo({ isAuthenticated: false, currentUser: null })
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: authInfo.isAuthenticated,
        currentUser: authInfo.currentUser,
        login,
        register,
        logout,
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
