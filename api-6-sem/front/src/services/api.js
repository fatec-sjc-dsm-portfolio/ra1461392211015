// src/services/apiService.js
import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://tf3g1c99sa.execute-api.us-east-1.amazonaws.com', // substitua pela sua URL base
  timeout: 10000, // tempo limite da requisição
})

// adicionando token de autenticação
apiClient.interceptors.request.use(
  (config) => {
    // Aqui você pode adicionar o token de autenticação
    if (localStorage.getItem('token')) {
      config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

apiClient.interceptors.response.use(
  (response) => {
    // Aqui você pode tratar os dados antes de serem repassados para o componente
    return response
  },
  (error) => {
    return error
  },
)

export default apiClient
