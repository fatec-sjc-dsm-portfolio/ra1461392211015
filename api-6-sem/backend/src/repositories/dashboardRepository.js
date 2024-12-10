const database = require('../config/database');
const tableComodoAcessos = 'tb_comodo_acesso';
const tableComodoPortas = 'tb_comodo_portas';
const tableEmpresasComodos = 'tb_empresa_comodos';

module.exports = {
  async getAllAcessos(params) {
    const result = await database(tableComodoAcessos).select(database.raw('count(*) as total_acessos'));

    return result;
  },

  async getAllAcessosRestritos(params) {
    const result = await database(tableComodoAcessos)
      .select(database.raw('count(*) as total_acessos'))
      .where({
        ['acesso_autorizado']: false,
      });

    return result;
  },

  async getAllAcessosByMonth(params) {
    const result = await database(tableComodoAcessos)
      .select(database.raw("DATE_FORMAT(dt_acesso, '%Y-%m-01') AS month, COUNT(*) AS total_acessos"))
      .groupBy('month')
      .orderBy('month');

    return result;
  },

  async getAllAcessosRestritosByMonth(params) {
    const result = await database(tableComodoAcessos)
      .select(database.raw("DATE_FORMAT(dt_acesso, '%Y-%m-01') AS month, COUNT(*) AS total_acessos"))
      .where('acesso_autorizado', false)
      .groupBy('month')
      .orderBy('month');

    return result;
  },

  async getPortasMonitoradas(params) {
    const result = await database(tableComodoPortas).select(database.raw('count(*) as total_portas'));

    return result;
  },

  async getEmpresasMonitoradas(params) {
    const result = await database(tableEmpresasComodos).select(
      database.raw('count(distinct id_empresa) as total_empresas'),
    );

    return result;
  },

  async getDadosGraficoAcessos(params) {
    //     SELECT
    //     DATE_FORMAT(dt_acesso, '%Y-%m-01') AS mes,
    //     tb_empresa.nome_empresa,
    //     MONTHNAME(dt_acesso) AS nome_mes,
    //     COUNT(*) AS total_acessos
    // FROM
    //     tb_comodo_acesso
    //         INNER JOIN
    //     tb_comodo_portas ON tb_comodo_acesso.id_comodo_portas = tb_comodo_portas.id_comodo_portas
    //         INNER JOIN
    //     tb_empresa_comodos ON tb_empresa_comodos.id_empresa_comodo = tb_comodo_portas.id_empresa_comodos
    //         INNER JOIN
    //     tb_empresa ON tb_empresa.id_empresa = tb_empresa_comodos.id_empresa
    // WHERE
    //     dt_acesso >= NOW() - INTERVAL 12 MONTH
    // GROUP BY mes , nome_mes, nome_empresa
    // ORDER BY mes;
    const result = await database(tableComodoAcessos)
      .select(
        database.raw(
          "DATE_FORMAT(dt_acesso, '%Y-%m-01') AS mes, tb_empresa.nome_empresa, MONTHNAME(dt_acesso) AS nome_mes, COUNT(*) AS total_acessos",
        ),
      )
      .innerJoin('tb_comodo_portas', 'tb_comodo_acesso.id_comodo_portas', 'tb_comodo_portas.id_comodo_portas')
      .innerJoin('tb_empresa_comodos', 'tb_empresa_comodos.id_empresa_comodo', 'tb_comodo_portas.id_empresa_comodos')
      .innerJoin('tb_empresa', 'tb_empresa.id_empresa', 'tb_empresa_comodos.id_empresa')
      .where('dt_acesso', '>=', database.raw('NOW() - INTERVAL 12 MONTH'))
      .groupBy('mes', 'nome_mes', 'nome_empresa')
      .orderBy('mes');

    return result;
  },
};
