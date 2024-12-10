import apiClient from './api'

const zonesServices = {
  async getAllZones() {
    return apiClient.get('/empresa-comodos')
  },
  async getAllDoorsOfZone(id) {
    return apiClient.get(`/comodo-portas/comodo/${id}`)
  },
  async createZone(zone) {
    return apiClient.post('/empresa-comodos', zone)
  },
  async createZoneDoor(door) {
    return apiClient.post('/comodo-portas', door)
  },
  async deleteZoneDoor(id) {
    return apiClient.delete(`/comodo-portas/${id}`)
  },
  async deleteZone(id) {
    return apiClient.delete(`/empresa-comodos/${id}`)
  },
  async updateZone(zone) {
    return apiClient.put(`/empresa-comodos/${zone.id_empresa_comodo}`, zone)
  },
}

export default zonesServices
