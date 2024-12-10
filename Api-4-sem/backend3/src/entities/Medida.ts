import { Sequelize, DataTypes, Model } from 'sequelize';
import  { conn } from '../config/db';
import { Parametro } from './Parametro';

export const Medida = conn.define('medidas', {
    id_medida: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    parametro_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Parametro,
            key: 'id_parametro'
        }
    },
    valor_medida: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    unixtime: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

});

Medida.belongsTo(Parametro, { foreignKey: 'parametro_id'})
