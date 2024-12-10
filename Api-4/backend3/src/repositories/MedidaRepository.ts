import { Op, where } from "sequelize";
import { IMedida } from "../Interfaces/IMedida";
import { Medida } from "../entities/Medida";
import { conn } from "../config/db";
import { Parametro } from "../entities/Parametro";
import { TipoParametro } from "../entities/TipoParametro";

export default class MedidaRepository {
    async findAll() {
        return await Medida.findAll();
    }

    async findById(id_medida: number) {
        return await Medida.findByPk(id_medida);
    }

    async findMaisNova(parametro_id) {
        const ultimoTime = await Medida.max("unixtime", {
            where: {
                parametro_id: parametro_id
            }
        });

        return await Medida.findOne({
            where: {
                parametro_id: parametro_id,
                unixtime: ultimoTime
            },
        });
    }

    async coletaDados(parametro_id, timeComeco, timeFinal) { //query procura por todas as medidas ligadas a um parametro ordenadas de mais antiga pra mais nova, e coleta o campo json na tabela "tipo parametro", exceto se o campo json for "bat" que no caso ele retornara nada
        return await Medida.findAll({
            attributes: ["valor_medida", "unixtime", "parametro_id", "parametro.id_tipo_parametro", "parametro.tipo_parametro.nome_campo_json"],
            include: [
                {
                    attributes: ["id_tipo_parametro"],
                    model: Parametro,
                    include: [{
                        attributes: ["nome_campo_json"],
                        model: TipoParametro,
                        where: {
                            nome_campo_json: {
                                [Op.ne]: 'bat'
                            },
                        },
                        required: true
                    }],
                    required: true
                },
            ],
            order: [['unixtime', 'ASC']],
            where: {
                parametro_id: parametro_id,
                unixtime: {
                    [Op.between]: [timeComeco, timeFinal]
                }
            }
        })
    }

    async create(medida: IMedida) {
        return await Medida.create({
            parametro_id: medida.parametro_id,
            valor_medida: medida.valor_medida,
            unixtime: medida.unixtime
        });
    }

    async update(medida: IMedida) {
        return await Medida.update(medida, {
            where: {
                id_medida: medida.id_medida
            }
        });
    }

    async Delete(id_medida: number) {
        return await Medida.destroy({
            where: {
                id_medida: id_medida
            }
        });
    }
}