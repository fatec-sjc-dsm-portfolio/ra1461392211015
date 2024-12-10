exports.up = function(knex) {
  return knex.schema.hasTable('tb_empresa').then(function(exists) {
    if (!exists) {
      return knex.schema.createTable('tb_empresa', function(table) {
        table.increments('id_empresa').primary();
        table.string('nome_empresa');
        table.string('telefone_empresa');
        table.string('cidade_empresa');
        table.string('bairro_empresa');
        table.string('logradouro_empresa');
        table.integer('numero_empresa');
        table.string('horario_funcionamento_de');
        table.string('horario_funcionamento_ate');
      });
    }
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('tb_empresa');
};
