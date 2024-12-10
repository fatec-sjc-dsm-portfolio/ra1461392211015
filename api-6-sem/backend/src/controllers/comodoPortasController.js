const bcrypt = require('bcrypt');
const { body, param, validationResult } = require('express-validator');
const comodoPortasRepository = require('../repositories/comodoPortasRepository');

exports.getComodoPortasById = [
  param('id').isInt().toInt(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const comodoPortas = await comodoPortasRepository.find({ id_comodo_portas: req.params.id });

      if (!comodoPortas) return res.status(404).json({ error: 'Porta não encontrada' });

      res.json(comodoPortas);
    } catch (error) {
      console.error('Erro ao buscar porta de comodo:', error);
      res.status(500).json({ error: 'Erro ao buscar porta de comodo' });
    }
  },
];

exports.getAllComodoPortas = async (req, res) => {
  try {
    const comodoPortas = await comodoPortasRepository.findAll();
    res.json(comodoPortas);
  } catch (error) {
    console.error('Erro ao buscar porta de comodo:', error);
    res.status(500).json({ error: 'Erro ao buscar porta de comodo' });
  }
};

exports.getAllCOmodosPortasByComodoId = [
  param('id').isInt().toInt(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const comodoPortas = await comodoPortasRepository.findAllByComodoId(req.params.id);

      if (!comodoPortas) return res.status(404).json({ error: 'Porta não encontrada' });

      res.json(comodoPortas);
    } catch (error) {
      console.error('Erro ao buscar porta de comodo:', error);
      res.status(500).json({ error: 'Erro ao buscar porta de comodo' });
    }
  },
];

exports.createComodoPortas = [
  body('descricao_porta').isString().trim().escape(),
  body('tempo').isInt(),
  body('senha_porta').optional().isInt(),
  body('id_empresa_comodos').isInt().withMessage('Deve ser um número inteiro'),

  async (req, res) => {
    const saltRounds = 10;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // const hashedPassword = await bcrypt.hash(req.body.senha_porta, saltRounds);

      const comodoPortaData = {
        descricao_porta: req.body.descricao_porta,
        status_porta: req.body.status_porta,
        senha_porta: req.body.senha_porta,
        tempo: req.body.tempo,
        id_empresa_comodos: req.body.id_empresa_comodos,
      };

      const [comodoPortaId] = await comodoPortasRepository.create(comodoPortaData);

      const newComodoPorta = await comodoPortasRepository.find({ id_comodo_portas: comodoPortaId });
      res.status(201).json(newComodoPorta);
    } catch (error) {
      console.error('Erro ao criar porta de comodo:', error);
      res.status(500).json({ error: 'Erro ao criar porta de comodo' });
    }
  },
];

exports.updateComodoPortas = [
  body('descricao_porta').optional().isString().trim().escape(),
  body('status_porta').optional().isInt().trim().escape(),
  body('id_empresa_comodos').optional().isInt().withMessage('Deve ser um número inteiro'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const updateComodoPortas = {
        descricao_porta: req.body.descricao_porta,
        status_porta: req.body.status_porta,
        id_empresa_comodos: req.body.id_empresa_comodos,
      };

      const affectedRows = await comodoPortasRepository.update(req.params.id, updateComodoPortas);

      if (affectedRows === 0) return res.status(404).json({ error: 'Porta não encontrado' });

      const comodoPortas = await comodoPortasRepository.find({ id_comodo_portas: req.params.id });
      res.json(comodoPortas);
    } catch (error) {
      console.error('Erro ao atualizar porta:', error);
      res.status(500).json({ error: 'Erro ao atualizar porta' });
    }
  },
];

exports.deleteComodoPortas = [
  param('id').isInt().toInt(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const affectedRows = await comodoPortasRepository.delete(req.params.id);

      if (affectedRows === 0) {
        return res.status(404).json({ error: 'Porta não encontrado' });
      }

      res.status(204).send();
    } catch (error) {
      console.error('Erro ao deletar porta:', error);
      res.status(500).json({ error: 'Erro ao deletar porta' });
    }
  },
];
