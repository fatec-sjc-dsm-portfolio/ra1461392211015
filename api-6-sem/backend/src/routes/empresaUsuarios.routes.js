const express = require('express');
const EmpresaUsuariosController = require('../controllers/empresaUsuariosController');
const router = express.Router();


router.post('/', EmpresaUsuariosController.createEmpresaUsuario);
router.get('/', EmpresaUsuariosController.getAllEmpresaUsuarios);
router.get('/:id', EmpresaUsuariosController.getEmpresaUsuarioById);
router.put('/:id', EmpresaUsuariosController.updateEmpresaUsuario);
router.delete('/:id', EmpresaUsuariosController.deleteEmpresaUsuario);

module.exports = router;
