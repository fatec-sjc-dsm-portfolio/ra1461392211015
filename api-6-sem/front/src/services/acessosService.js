import apiClient from './api'

const acessosServices = {
  async getAllAcess() {
    return apiClient.get('/comodo-acesso')
  },
  async createAcess(acess) {
    return apiClient.post('/comodo-acesso', acess)
  },
  async deleteAcess(id) {
    return apiClient.delete(`/comodo-acesso/${id}`)
  },
  async updateAcess(acess) {
    console.log(acess)
    return apiClient.put(`/comodo-acesso/${acess.id_acesso}`, acess)
  },
}

export default acessosServices
