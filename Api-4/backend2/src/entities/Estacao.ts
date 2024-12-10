import { Sequelize, DataTypes, Model } from 'sequelize';
import  { conn } from '../config/dbMysql';

export const Estacao = conn.define('estacoes', {
    id_estacao: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    mac_adress: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    nome_estacao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apelido: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    latitude: {
        type: DataTypes.DECIMAL(10,8),
        allowNull: false
    },
    longitude: {
        type: DataTypes.DECIMAL(11,8),
        allowNull: false
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status_estacao: {
        type: DataTypes.BOOLEAN,
        allowNull: false
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

// Estacao.sync({ alter: true })


// pupit
