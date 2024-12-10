exports.up = function(knex) {
    return knex.schema.table('tb_comodo_acesso', function(table) {
      table.integer('id_usuario').unsigned().notNullable();  
      table.foreign('id_usuario').references('id_usuario').inTable('tb_usuario').onDelete('CASCADE');  
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('tb_comodo_acesso', function(table) {
      table.dropForeign('id_usuario'); 
      table.dropColumn('id_usuario');
    });
  };
  