const { body, param, validationResult } = require('express-validator');
const dashboardRepository = require('../repositories/dashboardRepository');

exports.getAcessos = async (req, res) => {
  try {
    const acessos = await dashboardRepository.getAllAcessos();
    // const acessosByMonth = await dashboardRepository.getAllAcessosByMonth();
    res.json(acessos);
  } catch (error) {
    console.error('Erro ao buscar acessos:', error);
    res.status(500).json({ error: 'Erro ao buscar acessos' });
  }
};

exports.getAcessosNotAuthorized = async (req, res) => {
  try {
    const acessos = await dashboardRepository.getAllAcessosRestritos();
    // const acessosByMonth = await dashboardRepository.getAllAcessosRestritosByMonth();
    res.json(acessos);
  } catch (error) {
    console.error('Erro ao buscar acessos:', error);
    res.status(500).json({ error: 'Erro ao buscar acessos' });
  }
};

exports.getPortasMonitoradas = async (req, res) => {
  try {
    const portas = await dashboardRepository.getPortasMonitoradas();
    res.json(portas);
  } catch (error) {
    console.error('Erro ao buscar portas:', error);
    res.status(500).json({ error: 'Erro ao buscar portas' });
  }
};

exports.getEmpresasMonitoradas = async (req, res) => {
  try {
    const empresas = await dashboardRepository.getEmpresasMonitoradas();
    res.json(empresas);
  } catch (error) {
    console.error('Erro ao buscar empresas:', error);
    res.status(500).json({ error: 'Erro ao buscar empresas' });
  }
};

exports.dadosGraficoAcessos = async (req, res) => {
  try {
    const dados = await dashboardRepository.getDadosGraficoAcessos();
    res.json(dados);
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    res.status(500).json({ error: 'Erro ao buscar dados' });
  }
};
