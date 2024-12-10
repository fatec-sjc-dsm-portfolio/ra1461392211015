const database = require('../config/database');
const table = 'tb_comodo_acesso';

module.exports = {
  find: async (params) => {
    const findParams = [];

    if (params.hasOwnProperty('id_acesso')) {
      findParams.push('tb_comodo_acesso.id_acesso = ' + params.id_acesso);
    }

    const query = database(table).select('*').first();

    if (findParams.length > 0) {
      query.whereRaw(findParams.join(' AND '));
    }

    return await query;
  },

  // findAll: async () => {
  //   return await database(table)
  //     .innerJoin('tb_empresa_comodos', 'tb_empresa_comodos.id_empresa_comodo', `${table}.id_empresa_comodo`)
  //     .select([`${table}.*`, 'tb_empresa_comodos.nome_comodo']);
  // },
  
  findAll: async () => {
    return await database(table)
      .innerJoin('tb_comodo_portas', 'tb_comodo_portas.id_comodo_portas', `${table}.id_comodo_portas`)
      .select([`${table}.*`, 'tb_comodo_portas.descricao_porta']);
  },

  create: async (comodoAcessoData) => {
    const query = database(table).insert(comodoAcessoData);
    return await query;
  },

  update: async (id_acesso, comodoAcessoData) => {
    const query = database(table).where('id_acesso', id_acesso).update(comodoAcessoData);
    return await query;
  },

  delete: async (id_acesso) => {
    const query = database(table).where('id_acesso', id_acesso).del();
    return await query;
  },
};
