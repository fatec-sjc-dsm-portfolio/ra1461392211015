exports.up = function(knex) {
  return knex.schema.hasTable('tb_comodo_acesso').then(function(exists) {
    if (!exists) {
      return knex.schema.createTable('tb_comodo_acesso', function(table) {
        table.increments('id_acesso').primary();
        table.string('classificacao_acesso', 255).notNullable();
        table.string('observacao_acesso', 255).nullable();
        table.string('horario_acesso', 255).notNullable();
        table.integer('id_comodo_portas').unsigned().notNullable();

        table.foreign('id_comodo_portas').references('id_comodo_portas').inTable('tb_comodo_portas').onDelete('CASCADE');
      });
    }
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('tb_comodo_acesso'); 
};
