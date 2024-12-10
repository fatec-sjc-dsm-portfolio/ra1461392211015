const express = require('express');
const dashboardController = require('../controllers/dashboardController');
const dashboardRouter = express.Router();

dashboardRouter.get('/acessos', dashboardController.getAcessos);
dashboardRouter.get('/acessos-nao-autorizados', dashboardController.getAcessosNotAuthorized);
dashboardRouter.get('/portas-monitoradas', dashboardController.getPortasMonitoradas);
dashboardRouter.get('/empresas-monitoradas', dashboardController.getEmpresasMonitoradas);
dashboardRouter.get('/dados-grafico-acessos', dashboardController.dadosGraficoAcessos);

module.exports = dashboardRouter;
