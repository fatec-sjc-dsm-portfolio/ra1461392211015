const { body, param, validationResult } = require('express-validator');
const comodoAcessoRepository = require('../repositories/comodoAcessoRepository');

exports.getComodoAcessoById = [
  param('id').isInt().toInt(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const comodoAcesso = await comodoAcessoRepository.find({ id_acesso: req.params.id });

      if (!comodoAcesso) return res.status(404).json({ error: 'Acesso não encontrado' });

      res.json(comodoAcesso);
    } catch (error) {
      console.error('Erro ao buscar acesso:', error);
      res.status(500).json({ error: 'Erro ao buscar acesso' });
    }
  },
];

exports.getAllComodoAcesso = async (req, res) => {
  try {
    const comodoAcessos = await comodoAcessoRepository.findAll();
    res.json(comodoAcessos);
  } catch (error) {
    console.error('Erro ao buscar acessos:', error);
    res.status(500).json({ error: 'Erro ao buscar acessos' });
  }
};

exports.createComodoAcesso = [
  body('classificacao_acesso').isString().trim().escape(),
  body('observacao_acesso').optional().isString().trim().escape(),
  body('horario_acesso').isString().trim().escape(),
  body('id_comodo_portas').isInt().withMessage('Deve ser um número inteiro'),
  // body('id_usuario').isInt().withMessage('Deve ser um número inteiro'),
  body('acesso_autorizado').isBoolean().withMessage('Deve ser um valor booleano'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const comodoAcessoData = {
        classificacao_acesso: req.body.classificacao_acesso,
        observacao_acesso: req.body.observacao_acesso,
        horario_acesso: req.body.horario_acesso,
        id_comodo_portas: req.body.id_comodo_portas,
        id_usuario: req.user.id_usuario,
        acesso_autorizado: req.body.acesso_autorizado,
      };

      const [acessoId] = await comodoAcessoRepository.create(comodoAcessoData);

      const newComodoAcesso = await comodoAcessoRepository.find({ id_acesso: acessoId });
      res.status(201).json(newComodoAcesso);
    } catch (error) {
      console.error('Erro ao criar acesso:', error);
      res.status(500).json({ error: 'Erro ao criar acesso' });
    }
  },
];

exports.updateComodoAcesso = [
  param('id').isInt().toInt(),
  body('classificacao_acesso').isString().trim().escape(),
  body('observacao_acesso').optional().isString().trim().escape(),
  body('horario_acesso').isString().trim().escape(),
  body('id_comodo_portas').isInt().withMessage('Deve ser um número inteiro'),
  body('id_usuario').optional().isInt().withMessage('Deve ser um número inteiro'),
  body('acesso_autorizado').optional().isBoolean().withMessage('Deve ser um valor booleano'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const updateAcessoData = {
        classificacao_acesso: req.body.classificacao_acesso,
        observacao_acesso: req.body.observacao_acesso,
        horario_acesso: req.body.horario_acesso,
        id_comodo_portas: req.body.id_comodo_portas,
      };

      if (req.body.id_usuario) {
        updateAcessoData.id_usuario = req.body.id_usuario;
      }

      if (req.body.acesso_autorizado !== undefined) {
        updateAcessoData.acesso_autorizado = req.body.acesso_autorizado;
      }

      const affectedRows = await comodoAcessoRepository.update(req.params.id, updateAcessoData);

      if (affectedRows === 0) return res.status(404).json({ error: 'Acesso não encontrado' });

      const comodoAcesso = await comodoAcessoRepository.find({ id_acesso: req.params.id });
      res.json(comodoAcesso);
    } catch (error) {
      console.error('Erro ao atualizar acesso:', error);
      res.status(500).json({ error: 'Erro ao atualizar acesso' });
    }
  },
];

exports.deleteComodoAcesso = [
  param('id').isInt().toInt(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const affectedRows = await comodoAcessoRepository.delete(req.params.id);

      if (affectedRows === 0) {
        return res.status(404).json({ error: 'Acesso não encontrado' });
      }

      res.status(204).send();
    } catch (error) {
      console.error('Erro ao deletar acesso:', error);
      res.status(500).json({ error: 'Erro ao deletar acesso' });
    }
  },
];
