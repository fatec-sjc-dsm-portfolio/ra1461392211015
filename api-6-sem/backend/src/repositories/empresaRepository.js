const database = require('../config/database');
const table = 'tb_empresa';

module.exports = {
  find: async (params) => {
    const findParams = [];

    if (params.hasOwnProperty('id_empresa')) {
      findParams.push('tb_empresa.id_empresa = ' + params.id_empresa);
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

  create: async (empresaData) => {
    const query = database(table).insert(empresaData);
    return await query;
  },

  update: async (id_empresa, empresaData) => {
    const query = database(table).where('id_empresa', id_empresa).update(empresaData);
    return await query;
  },

  delete: async (id_empresa) => {
    const query = database(table).where('id_empresa', id_empresa).del();
    return await query;
  },
};
