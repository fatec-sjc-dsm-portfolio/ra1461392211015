exports.up = function(knex) {
    return knex.schema.table('tb_comodo_acesso', function(table) {
      table.boolean('acesso_autorizado').notNullable().defaultTo(true); 
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('tb_comodo_acesso', function(table) {
      table.dropColumn('acesso_autorizado');
    });
  };
  