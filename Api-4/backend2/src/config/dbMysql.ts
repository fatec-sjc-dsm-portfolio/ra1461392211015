import { Sequelize } from 'sequelize';

export const conn = new Sequelize( 'neocode', "root", 'thiago123', {
    host: '127.0.0.1',
    dialect: 'mysql'
    
});