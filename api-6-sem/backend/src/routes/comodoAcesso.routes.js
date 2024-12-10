const express = require('express');
const ComodoAcessoController = require('../controllers/comodoAcessoController');
const router = express.Router();

router.post('/', ComodoAcessoController.createComodoAcesso);
router.get('/', ComodoAcessoController.getAllComodoAcesso);
router.get('/:id', ComodoAcessoController.getComodoAcessoById);
router.put('/:id', ComodoAcessoController.updateComodoAcesso);
router.delete('/:id', ComodoAcessoController.deleteComodoAcesso);

module.exports = router;
