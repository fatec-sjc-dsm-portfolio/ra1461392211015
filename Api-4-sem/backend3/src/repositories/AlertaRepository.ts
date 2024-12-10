import { IAlerta } from "../Interfaces/IAlerta";
import { Alerta } from "../entities/Alerta";

export default class AlertaRepository{
    async findAll(){
        return await Alerta.findAll();
    }
    async findById(id_alerta: number){
        return await Alerta.findByPk(id_alerta);
    }   
    async create(alerta: IAlerta){
        return await Alerta.create({
            parametro_id: alerta.parametro_id,
            valor_delimitante: alerta.valor_delimitante,
            operador: alerta.operador,
            apelido: alerta.apelido,
            variavel: alerta.variavel
        });
    }
    async update(alerta: IAlerta){
        return await Alerta.update(alerta, {
            where: {
                id_alerta: alerta.id_alerta
            }
        });
    }
    async Delete(id_alerta: number){
        return await Alerta.destroy({
            where: {
                id_alerta: id_alerta
            }
        });
    }
}