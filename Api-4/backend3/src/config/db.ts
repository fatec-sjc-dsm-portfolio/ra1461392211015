import { Sequelize } from 'sequelize';
import './enviroument'
export const conn = new Sequelize(process.env.DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql'
});


