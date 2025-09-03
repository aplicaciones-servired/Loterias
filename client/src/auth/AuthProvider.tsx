import React, { createContext, type Dispatch, type SetStateAction, useContext, useEffect, useState } from 'react'
import { type User } from '../types/user'

interface IAuthContext {
  isAuthenticated: boolean
  login: () => void
  logout: () => void
  username: User
  setUsernames: Dispatch<SetStateAction<User>>
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>
}

interface Props {
  children: React.ReactNode
}

const AuthContext = createContext<IAuthContext | undefined>(undefined)

export const AuthProvider = ({ children }: Props): JSX.Element => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem('isAuthenticated')
    return (storedAuth != null) ? JSON.parse(storedAuth) : false
  })
  const [username, setUsernames] = useState<User>(() => {
    const storedUser = localStorage.getItem('username')
    return (storedUser != null) ? JSON.parse(storedUser) : null
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
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated))
  }, [isAuthenticated])

  useEffect(() => {
    localStorage.setItem('username', JSON.stringify(username))
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

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
