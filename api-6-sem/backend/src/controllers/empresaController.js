const { body, param, validationResult } = require('express-validator');
const empresaRepository = require('../repositories/empresaRepository');

exports.createEmpresa = [
  body('nome_empresa').isString().trim().escape(),
  body('telefone_empresa').isString().trim().escape(),
  body('cidade_empresa').isString().trim().escape(),
  body('bairro_empresa').isString().trim().escape(),
  body('logradouro_empresa').isString().trim().escape(),
  body('numero_empresa').isInt().toInt(),
  body('horario_funcionamento_de').isString().trim().escape(),
  body('horario_funcionamento_ate').isString().trim().escape(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const empresaData = {
        nome_empresa: req.body.nome_empresa,
        telefone_empresa: req.body.telefone_empresa,
        cidade_empresa: req.body.cidade_empresa,
        bairro_empresa: req.body.bairro_empresa,
        logradouro_empresa: req.body.logradouro_empresa,
        numero_empresa: req.body.numero_empresa,
        horario_funcionamento_de: req.body.horario_funcionamento_de,
        horario_funcionamento_ate: req.body.horario_funcionamento_ate,
      };

      const [empresaId] = await empresaRepository.create(empresaData);

      const newEmpresa = await empresaRepository.find({ id_empresa: empresaId });
      res.status(201).json(newEmpresa);
    } catch (error) {
      console.error('Erro ao criar empresa:', error);
      res.status(500).json({ error: 'Erro ao criar a empresa' });
    }
  }
];

exports.getAllEmpresas = async (req, res) => {
  try {
    const empresas = await empresaRepository.findAll();
    res.json(empresas);
  } catch (error) {
    console.error('Erro ao buscar empresas:', error);
    res.status(500).json({ error: 'Erro ao buscar empresas' });
  }
};

exports.getEmpresaById = [
  param('id').isInt().toInt(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const empresa = await empresaRepository.find({ id_empresa: req.params.id });

      if (!empresa) return res.status(404).json({ error: 'Empresa não encontrada' });

      res.json(empresa);
    } catch (error) {
      console.error('Erro ao buscar empresa:', error);
      res.status(500).json({ error: 'Erro ao buscar empresa' });
    }
  }
];

exports.updateEmpresa = [
  body('nome_empresa').optional().isString().trim().escape(),
  body('telefone_empresa').optional().isString().trim().escape(),
  body('cidade_empresa').optional().isString().trim().escape(),
  body('bairro_empresa').optional().isString().trim().escape(),
  body('logradouro_empresa').optional().isString().trim().escape(),
  body('numero_empresa').optional().isInt().toInt(),
  body('horario_funcionamento_de').optional().isString().trim().escape(),
  body('horario_funcionamento_ate').optional().isString().trim().escape(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const updatedEmpresa = {
        nome_empresa: req.body.nome_empresa,
        telefone_empresa: req.body.telefone_empresa,
        cidade_empresa: req.body.cidade_empresa,
        bairro_empresa: req.body.bairro_empresa,
        logradouro_empresa: req.body.logradouro_empresa,
        numero_empresa: req.body.numero_empresa,
        horario_funcionamento_de: req.body.horario_funcionamento_de,
        horario_funcionamento_ate: req.body.horario_funcionamento_ate,
      };

      const affectedRows = await empresaRepository.update(req.params.id, updatedEmpresa);

      if (affectedRows === 0) return res.status(404).json({ error: 'Empresa não encontrada' });

      const empresa = await empresaRepository.find({ id_empresa: req.params.id });
      res.json(empresa);
    } catch (error) {
      console.error('Erro ao atualizar empresa:', error);
      res.status(500).json({ error: 'Erro ao atualizar empresa' });
    }
  }
];

exports.deleteEmpresa = [
  param('id').isInt().toInt(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const affectedRows = await empresaRepository.delete(req.params.id);

      if (affectedRows === 0) return res.status(404).json({ error: 'Empresa não encontrada' });

      res.status(204).send();
    } catch (error) {
      console.error('Erro ao deletar empresa:', error);
      res.status(500).json({ error: 'Erro ao deletar empresa' });
    }
  }
];
