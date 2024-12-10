import apiClient from './api'

const companiesServices = {
  // Método para fazer login
  async getAllCompanies() {
    return apiClient.get('/empresa')
  },
  async createCompanie(companie) {
    return apiClient.post('/empresa', companie)
  },
  async deleteCompanie(id) {
    return apiClient.delete(`/empresa/${id}`)
  },
  async updateCompanie(companie) {
    console.log(companie)
    return apiClient.put(`/empresa/${companie.id_empresa}`, companie)
  },
}

export default companiesServices
