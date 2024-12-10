const express = require('express');
const EmpresaController = require('../controllers/empresaController');
const router = express.Router();


router.post('/', EmpresaController.createEmpresa);
router.get('/', EmpresaController.getAllEmpresas);
router.get('/:id', EmpresaController.getEmpresaById);
router.put('/:id', EmpresaController.updateEmpresa);
router.delete('/:id', EmpresaController.deleteEmpresa);

module.exports = router;
