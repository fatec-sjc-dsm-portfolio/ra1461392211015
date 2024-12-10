const database = require('../config/database');
const table = 'tb_comodo_portas';

module.exports = {
  find: async (params) => {
    const findParams = [];

    if (params.hasOwnProperty('id_comodo_portas')) {
      findParams.push('tb_comodo_portas.id_comodo_portas = ' + params.id_comodo_portas);
    }

    const query = database(table)
      .select('tb_comodo_portas.*', 'tb_empresa_comodos.nome_comodo')
      .leftJoin('tb_empresa_comodos', 'tb_comodo_portas.id_empresa_comodos', 'tb_empresa_comodos.id_empresa_comodo')
      .first();

    if (findParams.length > 0) {
      query.whereRaw(findParams.join(' AND '));
    }

    return await query;
  },

  findAll: async () => {
    const query = database(table)
      .select('tb_comodo_portas.*', 'tb_empresa_comodos.nome_comodo')
      .leftJoin('tb_empresa_comodos', 'tb_comodo_portas.id_empresa_comodos', 'tb_empresa_comodos.id_empresa_comodo');
    return await query;
  },

  findAllByComodoId: async (id_empresa_comodos) => {
    const query = database(table)
      .select('tb_comodo_portas.*')
      .where('tb_comodo_portas.id_empresa_comodos', id_empresa_comodos);
    return await query;
  },

  create: async (comodoPortaData) => {
    comodoPortaData.status_porta = comodoPortaData.status_porta ? 1 : 0;
    const query = database(table).insert(comodoPortaData);
    return await query;
  },

  update: async (id_comodo_portas, comodoPortaData) => {
    comodoPortaData.status_porta = comodoPortaData.status_porta ? 1 : 0;
    const query = database(table).where('id_comodo_portas', id_comodo_portas).update(comodoPortaData);
    return await query;
  },

  delete: async (id_comodo_portas) => {
    const query = database(table).where('id_comodo_portas', id_comodo_portas).del();
    return await query;
  },
};
