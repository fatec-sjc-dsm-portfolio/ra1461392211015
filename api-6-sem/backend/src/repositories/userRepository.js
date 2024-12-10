const database = require('../config/database');
const table = 'tb_usuario';

module.exports = {
  find: async (params) => {
    const findParams = [];

    if (params.hasOwnProperty('id_usuario')) {
      findParams.push('tb_usuario.id_usuario = ' + params.id_usuario);
    }

    if (params.hasOwnProperty('cpf_usuario')) {
      findParams.push('tb_usuario.cpf_usuario = ' + params.cpf_usuario);
    }

    const query = database(table)
      .select('tb_usuario.*', 'tb_nivel_acesso.nome_nivel')
      .leftJoin('tb_nivel_acesso', 'tb_usuario.id_nivel_acesso', 'tb_nivel_acesso.id_nivel_acesso')
      .first();

    if (findParams.length > 0) {
      query.whereRaw(findParams.join(' AND '));
    }

    return await query;
  },

  findAll: async () => {
    const query = database(table)
      .select('tb_usuario.*', 'tb_nivel_acesso.nome_nivel')
      .leftJoin('tb_nivel_acesso', 'tb_usuario.id_nivel_acesso', 'tb_nivel_acesso.id_nivel_acesso');
    return await query;
  },

  create: async (userData) => {
    const query = database(table).insert(userData);
    return await query;
  },

  update: async (id_usuario, userData) => {
    const query = database(table).where('id_usuario', id_usuario).update(userData);
    return await query;
  },

  delete: async (id_usuario) => {
    const query = database(table).where('id_usuario', id_usuario).del();
    return await query;
  },
};
