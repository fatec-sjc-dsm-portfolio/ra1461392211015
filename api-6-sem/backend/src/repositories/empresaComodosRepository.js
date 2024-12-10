const database = require('../config/database');
const table = 'tb_empresa_comodos';

module.exports = {
  find: async (params) => {
    const findParams = [];

    if (params.hasOwnProperty('id_empresa_comodo')) {
      findParams.push('tb_empresa_comodos.id_empresa_comodo = ' + params.id_empresa_comodo);
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

  create: async (comodoData) => {
    const query = database(table).insert(comodoData);
    return await query;
  },

  update: async (id_empresa_comodo, comodoData) => {
    const query = database(table).where('id_empresa_comodo', id_empresa_comodo).update(comodoData);
    return await query;
  },

  delete: async (id_empresa_comodo) => {
    const query = database(table).where('id_empresa_comodo', id_empresa_comodo).del();
    return await query;
  },
};
