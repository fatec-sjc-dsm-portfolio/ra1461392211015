exports.up = function(knex) {
    return knex.schema.createTable('tb_nivel_acesso', function(table) {
      table.increments('id_nivel_acesso').unsigned().primary();
      table.string('nome_nivel', 255).notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('tb_nivel_acesso');
  };
  