import { Sequelize, DataTypes, Model } from 'sequelize';
import  { conn } from '../config/db';
import { Parametro } from './Parametro';
export const Alerta = conn.define('alertas', {
    id_alerta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    apelido:{
        type: DataTypes.STRING,
        allowNull: false
    },
    variavel:{
        type: DataTypes.STRING,
        allowNull: false
    },
    parametro_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Parametro,
            key: 'id_parametro'
        }
    },
    valor_delimitante: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    operador: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Alerta.belongsTo(Parametro, { foreignKey: 'parametro_id'})
