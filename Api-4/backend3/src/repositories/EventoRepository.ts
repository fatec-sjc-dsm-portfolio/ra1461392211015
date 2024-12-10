import { Evento } from "../entities/Evento";
import { IEvento } from "../Interfaces/IEvento";

export default class EventoRepository{
    async findAll(){
        return await Evento.findAll();
    }
    async findById(id_evento: number){
        return await Evento.findByPk(id_evento);
    }   
    async create(evento: IEvento){
        return await Evento.create({
            id_parametro: evento.id_parametro,
            id_medida: evento.id_medida,
            id_alerta: evento.id_alerta
        });
    }
    async update(evento: IEvento){
        return await Evento.update(evento, {
            where: {
                id_evento: evento.id_evento
            }
        });
    }
    async Delete(id_evento: number){
        return await Evento.destroy({
            where: {
                id_evento: id_evento
            }
        });
    }

    async TruncateTable(){
        return await Evento.truncate();
    }
}