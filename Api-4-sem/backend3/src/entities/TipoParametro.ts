import { DataTypes } from 'sequelize';
import  { conn } from '../config/db';

export const TipoParametro = conn.define('tipo_parametro', {
    id_tipo_parametro: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nome_campo_json: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo_sensor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nome_sensor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fator: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    offset: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    status_tipo_parametro: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }

});

// TipoParametro.sync({ alter: true })
