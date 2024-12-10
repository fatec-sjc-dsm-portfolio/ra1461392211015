const express = require('express');
const EmpresaComodosController = require('../controllers/empresaComodosController');
const router = express.Router();


router.post('/', EmpresaComodosController.createEmpresaComodo);
router.get('/', EmpresaComodosController.getAllEmpresaComodos);
router.get('/:id', EmpresaComodosController.getEmpresaComodoById);
router.put('/:id', EmpresaComodosController.updateEmpresaComodo);
router.delete('/:id', EmpresaComodosController.deleteEmpresaComodo);

module.exports = router;
