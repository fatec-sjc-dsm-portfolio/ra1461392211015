const database = require('../config/database');
const table = 'tb_empresa_usuarios';

module.exports = {
  find: async (params) => {
    const findParams = [];

    if (params.hasOwnProperty('id')) {
      findParams.push('tb_empresa_usuarios.id = ' + params.id);
    }
    if (params.hasOwnProperty('id_empresa')) {
      findParams.push('tb_empresa_usuarios.id_empresa = ' + params.id_empresa);
    }
    if (params.hasOwnProperty('id_usuario')) {
      findParams.push('tb_empresa_usuarios.id_usuario = ' + params.id_usuario);
    }

    const query = database(table).select('*').first();

    if (findParams.length > 0) {
      query.whereRaw(findParams.join(' AND '));
    }

    return await query;
  },

  findAll: async () => {
    const query = database(table).select('*');
    return await query;
  },

  create: async (empresaUsuarioData) => {
    const query = database(table).insert(empresaUsuarioData);
    return await query;
  },

  update: async (id, empresaUsuarioData) => {
    const query = database(table).where('id', id).update(empresaUsuarioData);
    return await query;
  },

  delete: async (id) => {
    const query = database(table).where('id', id).del();
    return await query;
  },
};
