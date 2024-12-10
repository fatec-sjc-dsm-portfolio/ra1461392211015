const { body, param, validationResult } = require('express-validator');
const empresaComodosRepository = require('../repositories/empresaComodosRepository');


exports.createEmpresaComodo = [
  body('nome_comodo').isString().trim().escape(),
  body('tamanho_comodo').isInt().toInt(),
  body('tipo_acesso').isString().trim().escape(),
  body('id_empresa').isInt().toInt(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const empresaComodoData = {
        nome_comodo: req.body.nome_comodo,
        tamanho_comodo: req.body.tamanho_comodo,
        tipo_acesso: req.body.tipo_acesso,
        id_empresa: req.body.id_empresa,
      };

      const [empresaComodoId] = await empresaComodosRepository.create(empresaComodoData);

      const newEmpresaComodo = await empresaComodosRepository.find({ id_empresa_comodo: empresaComodoId });
      res.status(201).json(newEmpresaComodo);
    } catch (error) {
      console.error('Erro ao criar cômodo:', error);
      res.status(500).json({ error: 'Erro ao criar o cômodo' });
    }
  }
];

// Buscar todos os cômodos
exports.getAllEmpresaComodos = async (req, res) => {
  try {
    const empresaComodos = await empresaComodosRepository.findAll();
    res.json(empresaComodos);
  } catch (error) {
    console.error('Erro ao buscar cômodos:', error);
    res.status(500).json({ error: 'Erro ao buscar cômodos' });
  }
};


exports.getEmpresaComodoById = [
  param('id').isInt().toInt(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const empresaComodo = await empresaComodosRepository.find({ id_empresa_comodo: req.params.id });

      if (!empresaComodo) return res.status(404).json({ error: 'Cômodo não encontrado' });

      res.json(empresaComodo);
    } catch (error) {
      console.error('Erro ao buscar cômodo:', error);
      res.status(500).json({ error: 'Erro ao buscar cômodo' });
    }
  }
];


exports.updateEmpresaComodo = [
  body('nome_comodo').optional().isString().trim().escape(),
  body('tamanho_comodo').optional().isInt().toInt(),
  body('tipo_acesso').optional().isString().trim().escape(),
  body('id_empresa').optional().isInt().toInt(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const updatedEmpresaComodo = {
        nome_comodo: req.body.nome_comodo,
        tamanho_comodo: req.body.tamanho_comodo,
        tipo_acesso: req.body.tipo_acesso,
        id_empresa: req.body.id_empresa,
      };

      const affectedRows = await empresaComodosRepository.update(req.params.id, updatedEmpresaComodo);

      if (affectedRows === 0) return res.status(404).json({ error: 'Cômodo não encontrado' });

      const empresaComodo = await empresaComodosRepository.find({ id_empresa_comodo: req.params.id });
      res.json(empresaComodo);
    } catch (error) {
      console.error('Erro ao atualizar cômodo:', error);
      res.status(500).json({ error: 'Erro ao atualizar cômodo' });
    }
  }
];


exports.deleteEmpresaComodo = [
  param('id').isInt().toInt(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const affectedRows = await empresaComodosRepository.delete(req.params.id);

      if (affectedRows === 0) return res.status(404).json({ error: 'Cômodo não encontrado' });

      res.status(204).send();
    } catch (error) {
      console.error('Erro ao deletar cômodo:', error);
      res.status(500).json({ error: 'Erro ao deletar cômodo' });
    }
  }
];
