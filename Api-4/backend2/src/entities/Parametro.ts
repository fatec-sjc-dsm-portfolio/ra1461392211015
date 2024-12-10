import { Sequelize, DataTypes, Model } from 'sequelize';
import  { conn } from '../config/dbMysql';
import { TipoParametro } from './TipoParametro';
import { Estacao } from './Estacao';


export const Parametro = conn.define('parametros', {
    id_parametro: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id_estacao: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Estacao,
            key: 'id_estacao'
        }
    },
    id_tipo_parametro: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: TipoParametro,
            key: 'id_tipo_parametro'
        }
    },
    status_parametro: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
});

Parametro.belongsTo(Estacao, { foreignKey: 'id_estacao' });
Parametro.belongsTo(TipoParametro, { foreignKey: 'id_tipo_parametro' });


