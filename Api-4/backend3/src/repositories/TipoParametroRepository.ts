import { ITipoParametro } from "../Interfaces/ITipoParametro";
import { TipoParametro } from "../entities/TipoParametro";

export default class TipoParametroRepository {
    async findAll() {
        try {
            // Return all parameter types using the ITipoParametro interface and Sequelize
            return await TipoParametro.findAll();
        } catch (error) {
            console.error(error);
        }
    }

    async findById(id_tipo_parametro: number) {
        try {
            return await TipoParametro.findByPk(id_tipo_parametro);
        } catch (error) {
            console.error(error);
        }
    }

    async getCamposByIdTipoParametro(id_tipo_parametro: number) {
        try {
            return await TipoParametro.findAll({
                attributes: ['nome_campo_json'],
                where: {
                    id_tipo_parametro: id_tipo_parametro,
                },
            });
        } catch (error) {
            console.error(error);
        }
    }

    async create(tipo_parametro: ITipoParametro) {
        try {
            return await TipoParametro.create({
                nome_campo_json: tipo_parametro.nome_campo_json,
                nome_sensor: tipo_parametro.nome_sensor,
                tipo_sensor: tipo_parametro.tipo_sensor,
                fator: tipo_parametro.fator,
                offset: tipo_parametro.offset,
            });
        } catch (error) {
            console.error(error);
        }
    }

    async update(tipo_parametro: ITipoParametro) {
        try {
            return await TipoParametro.update(
                {
                    id_tipo_parametro: tipo_parametro.id_tipo_parametro,
                    nome_campo_json: tipo_parametro.nome_campo_json,
                    nome_sensor: tipo_parametro.nome_sensor,
                    tipo_sensor: tipo_parametro.tipo_sensor,
                    fator: tipo_parametro.fator,
                    offset: tipo_parametro.offset,
                    updatedAt: new Date(),
                },
                {
                    where: {
                        id_tipo_parametro: tipo_parametro.id_tipo_parametro,
                    },
                }
            );
        } catch (error) {
            console.error(error);
        }
    }

    async softDelete(id_tipo_parametro: number) {
        try {
            return await TipoParametro.update(
                {
                    status_tipo_parametro: false,
                    updatedAt: new Date(),
                },
                {
                    where: {
                        id_tipo_parametro: id_tipo_parametro,
                    },
                }
            );
        } catch (error) {
            console.error(error);
        }
    }
}
