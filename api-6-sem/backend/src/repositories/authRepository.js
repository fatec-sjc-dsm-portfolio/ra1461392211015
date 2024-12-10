const database = require('../config/database');
const table = 'tb_usuario';

module.exports = {
  async login(params = null) {
    const result = await database(table)
      .select('*')
      .where({
        ['email_usuario']: params.email,
      })
      .first();

    return result;
  },
  async find(params = null) {
    const result = await database(table).select('*').where(params).first();

    return result;
  },
};
