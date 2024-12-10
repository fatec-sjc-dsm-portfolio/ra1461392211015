import { IParametro } from "../interfaces/IParametro";
import { Parametro } from "../entities/Parametro";

export default class ParametroRepository {
    async findAll() {
        try {
            // Return all parameters using the IParametro interface and Sequelize
            return await Parametro.findAll();
        } catch (error) {
            console.error(error);
        }
    }

    async findById(id_parametro: number) {
        try {
            return await Parametro.findByPk(id_parametro);
        } catch (error) {
            console.error(error);
        }
    }

    async findByEstacao(id_estacao: string) {
        try {
            return await Parametro.findAll({
                where: {
                    id_estacao: id_estacao
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    async create(parametro: IParametro) {
        try {
            return await Parametro.create({
                id_estacao: parametro.id_estacao,
                id_tipo_parametro: parametro.id_tipo_parametro,
            });
        } catch (error) {
            console.error(error);
        }
    }

    async update(parametro: IParametro) {
        try {
            return await Parametro.update(parametro, 
                {
                    where: {
                        id_parametro: parametro.id_parametro,
                    },
                }
            );
        } catch (error) {
            console.error(error);
        }
    }

    async softDelete(id_parametro: number) {
        try {
            return await Parametro.update(
                {
                    status_parametro: false,
                    updatedAt: new Date(),
                },
                {
                    where: {
                        id_parametro: id_parametro,
                    },
                }
            );
        } catch (error) {
            console.error(error);
        }
    }
}
