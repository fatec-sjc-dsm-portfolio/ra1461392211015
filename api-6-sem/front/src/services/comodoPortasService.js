import apiClient from './api'

const comodoPortasServices = {
  async getAllComodoPortas() {
    return apiClient.get(`comodo-portas/${id}`)
  }
}

export default comodoPortasServices
