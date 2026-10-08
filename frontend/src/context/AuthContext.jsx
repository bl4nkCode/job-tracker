import { createContext, useContext, useState } from 'react'
import api from '../api/axios'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // Start with the saved user (if any) so a page refresh keeps you logged in
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })

  const saveSession = (data) => {
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
    setUser(data.user)
  }

  const login = async (email, password) => {
    const res = await api.post('/login', { email, password })
    saveSession(res.data)
  }

  const register = async (name, email, password, password_confirmation) => {
    const res = await api.post('/register', {
      name,
      email,
      password,
      password_confirmation,
    })
    saveSession(res.data)
  }

  const logout = async () => {
    try {
      await api.post('/logout')
    } finally {
      // Clear local data even if the server request fails
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext)