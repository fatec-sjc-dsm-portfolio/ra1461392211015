import apiClient from './api'

const dashboardService = {
  async getAcessos() {
    const response = await apiClient.get('/dash/acessos')
    return response.data
  },
  async getAcessosNaoAutorizados() {
    const response = await apiClient.get('/dash/acessos-nao-autorizados')
    return response.data
  },
  async getPortasMonitoradas() {
    const response = await apiClient.get('/dash/portas-monitoradas')
    return response.data
  },
  async getEmpresasMonitoradas() {
    const response = await apiClient.get('/dash/empresas-monitoradas')
    return response.data
  },
  async getDadosGrafico() {
    const response = await apiClient.get('/dash/dados-grafico-acessos')
    return response.data
  },
}

export default dashboardService
