import { createContext, type Dispatch, type SetStateAction, useContext, useEffect, useState } from 'react'
import { type User } from '../types/Interfaces'
import type { JSX } from "react/jsx-runtime";

interface IAuthContext {
  isAuthenticated: boolean
  login: () => void
  logout: () => void
  username: User | null
  setUsernames: Dispatch<SetStateAction<User | null>>
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>
}

interface Props {
  children: React.ReactNode
}

const AuthContext = createContext<IAuthContext | undefined>(undefined)

export const AuthProvider = ({ children }: Props): JSX.Element => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const storedAuth = localStorage.getItem('isAuthenticated')
    try {
      return storedAuth ? JSON.parse(storedAuth) : false
    } catch {
      return false
    }
  })

  const [username, setUsernames] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('username')
    try {
      return storedUser ? JSON.parse(storedUser) : null
    } catch {
      return null
    }
  })



  let inactivityTimer: ReturnType<typeof setTimeout>

  const resetInactivityTimer = (): void => {
    clearTimeout(inactivityTimer)
    inactivityTimer = setTimeout(() => {
      logout()
    }, 10 * 60 * 1000)
  }

  useEffect(() => {
    const events = ['click', 'keydown', 'mousemove', 'scroll']
    events.forEach(event => {
      window.addEventListener(event, resetInactivityTimer)
    })

    resetInactivityTimer()

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, resetInactivityTimer)
      })
      clearTimeout(inactivityTimer)
    }
  }, [])

  useEffect(() => {
  if (isAuthenticated !== undefined) {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated))
  }
}, [isAuthenticated])

useEffect(() => {
  if (username !== undefined) {
    localStorage.setItem('username', JSON.stringify(username))
  }
}, [username])


  useEffect(() => {
    if ((Boolean(isAuthenticated)) && location.pathname === '/') {
      logout()
    }
  }, [isAuthenticated, location.pathname])

  const login = (): void => {
    setIsAuthenticated(true)
  }

  const logout = (): void => {
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, login, logout, username, setUsernames }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
