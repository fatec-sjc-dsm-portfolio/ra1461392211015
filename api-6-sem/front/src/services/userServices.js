import apiClient from './api'

const userServices = {
  // Método para buscar todos os usuários
  async getAllUsers() {
    return await apiClient.get('/users')
  },
  // Método para buscar um usuário pelo ID
  async getUserById(id) {
    return await apiClient.get(`/users/${id}`)
  },
  // Método para criar um usuário
  async createUser(user) {
    return await apiClient.post('/users', user)
  },
  // Método para atualizar um usuário
  async updateUser(id, user) {
    return await apiClient.put(`/users/${id}`, user)
  },
  // Método para deletar um usuário
  async deleteUser(id) {
    return await apiClient.delete(`/users/${id}`)
  },
}

export default userServices
