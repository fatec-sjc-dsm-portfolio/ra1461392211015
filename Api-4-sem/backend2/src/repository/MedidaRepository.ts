import { IMedida } from "../interfaces/IMedida";
import { Medida } from "../entities/Medida";

export default class MedidaRepository {
    async findAll() {
        return await Medida.findAll();
    }

    async findById(id_medida: number) {
        return await Medida.findByPk(id_medida);
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