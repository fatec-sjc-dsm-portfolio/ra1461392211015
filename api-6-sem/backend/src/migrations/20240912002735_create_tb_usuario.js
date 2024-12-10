exports.up = function(knex) {
  return knex.schema.hasTable('tb_usuario').then(function(exists) {
    if (!exists) {
      return knex.schema.createTable('tb_usuario', function(table) {
        table.increments('id_usuario').primary();
        table.string('nome_usuario', 255).notNullable();
        table.string('cpf_usuario', 11).notNullable().unique();
        table.string('email_usuario', 255).notNullable().unique();
        table.string('telefone_usuario', 20).notNullable();
        table.string('password_usuario', 255).notNullable();

        table.integer('id_nivel_acesso').unsigned().notNullable()
             .references('id_nivel_acesso')
             .inTable('tb_nivel_acesso')
             .onDelete('CASCADE')
             .onUpdate('CASCADE');
      });
    }
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('tb_usuario');
};
