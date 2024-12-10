const knex = require("knex");

const dbConfig = {
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
};

let instance = null;

// Função para criar ou obter a instância do Knex
function getKnexInstance() {
  if (!instance) {
    instance = knex(dbConfig);
  }
  return instance;
}

module.exports = getKnexInstance();
