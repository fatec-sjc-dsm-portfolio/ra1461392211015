import React, { createContext, useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import authServices from '../services/authService'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const checkAuth = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const { data } = await authServices.me(token)
        setUser(data)
      } catch (error) {
        console.error('Erro ao buscar usuário:', error)
        logout()
      }
    }
    setLoading(false)
  }

  const login = async (userData, navigate) => {
    localStorage.setItem('token', userData.data.token)
    const { data } = await authServices.me(userData.data.token)
    setUser(data)
    navigate('/')
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('token')
  }

  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>{children}</AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useAuth = () => {
  return useContext(AuthContext)
}
