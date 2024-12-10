const { body, param, validationResult } = require('express-validator');
const empresaUsuariosRepository = require('../repositories/empresaUsuariosRepository');

exports.createEmpresaUsuario = [
  body('id_empresa').isInt().toInt(),
  body('id_usuario').isInt().toInt(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const empresaUsuarioData = {
        id_empresa: req.body.id_empresa,
        id_usuario: req.body.id_usuario,
      };

      const [empresaUsuarioId] = await empresaUsuariosRepository.create(empresaUsuarioData);

      const newEmpresaUsuario = await empresaUsuariosRepository.find({ id: empresaUsuarioId });
      res.status(201).json(newEmpresaUsuario);
    } catch (error) {
      console.error('Erro ao criar empresa-usuário:', error);
      res.status(500).json({ error: 'Erro ao criar empresa-usuário' });
    }
  }
];

exports.getAllEmpresaUsuarios = async (req, res) => {
  try {
    const empresaUsuarios = await empresaUsuariosRepository.findAll();
    res.json(empresaUsuarios);
  } catch (error) {
    console.error('Erro ao buscar empresa-usuários:', error);
    res.status(500).json({ error: 'Erro ao buscar empresa-usuários' });
  }
};


exports.getEmpresaUsuarioById = [
  param('id').isInt().toInt(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const empresaUsuario = await empresaUsuariosRepository.find({ id: req.params.id });

      if (!empresaUsuario) return res.status(404).json({ error: 'Empresa-usuário não encontrado' });

      res.json(empresaUsuario);
    } catch (error) {
      console.error('Erro ao buscar empresa-usuário:', error);
      res.status(500).json({ error: 'Erro ao buscar empresa-usuário' });
    }
  }
];


exports.updateEmpresaUsuario = [
  body('id_empresa').optional().isInt().toInt(),
  body('id_usuario').optional().isInt().toInt(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const updatedEmpresaUsuario = {
        id_empresa: req.body.id_empresa,
        id_usuario: req.body.id_usuario,
      };

      const affectedRows = await empresaUsuariosRepository.update(req.params.id, updatedEmpresaUsuario);

      if (affectedRows === 0) return res.status(404).json({ error: 'Empresa-usuário não encontrado' });

      const empresaUsuario = await empresaUsuariosRepository.find({ id: req.params.id });
      res.json(empresaUsuario);
    } catch (error) {
      console.error('Erro ao atualizar empresa-usuário:', error);
      res.status(500).json({ error: 'Erro ao atualizar empresa-usuário' });
    }
  }
];


exports.deleteEmpresaUsuario = [
  param('id').isInt().toInt(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const affectedRows = await empresaUsuariosRepository.delete(req.params.id);

      if (affectedRows === 0) return res.status(404).json({ error: 'Empresa-usuário não encontrado' });

      res.status(204).send();
    } catch (error) {
      console.error('Erro ao deletar empresa-usuário:', error);
      res.status(500).json({ error: 'Erro ao deletar empresa-usuário' });
    }
  }
];
