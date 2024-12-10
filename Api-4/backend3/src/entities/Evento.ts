import { Sequelize, DataTypes, Model } from 'sequelize';
import  { conn } from '../config/db';
import { Medida } from './Medida';
import { Parametro } from './Parametro';
import { Alerta } from './Alerta';

export const Evento = conn.define('eventos', {
    id_evento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id_parametro: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Parametro,
            key: 'id_parametro'
        }
    },
    id_medida: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Medida,
            key: 'id_medida'
        }
    },
    id_alerta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Alerta,
            key: 'id_alerta'
        }
    }

});


Evento.belongsTo(Parametro, { foreignKey: 'id_parametro' });
Evento.belongsTo(Medida, { foreignKey: 'id_medida' });
Evento.belongsTo(Alerta, { foreignKey: 'id_alerta' });


