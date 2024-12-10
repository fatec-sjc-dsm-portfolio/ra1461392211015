import apiClient from './api'

const authServices = {
  // Método para fazer login
  async login(credentials) {
    return apiClient.post('/auth/login', credentials)
  },
  async me(token) {
    return apiClient.get('/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
}

export default authServices
