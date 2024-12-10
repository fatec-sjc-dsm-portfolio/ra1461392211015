import AlertaRepository from "../repositories/AlertaRepository";
import MedidaRepository from "../repositories/MedidaRepository";
import EventoRepository from "../repositories/EventoRepository";
import { IEvento } from "../Interfaces/IEvento";


export async function verificandoAlertas() {

    const alertaRepository = new AlertaRepository();
    const medidasRepository = new MedidaRepository();
    const eventosRepository = new EventoRepository();
    
    const alertas = await alertaRepository.findAll() ;
    const medidas = await medidasRepository.findAll();

    var operators = {
        '>': function(a,b) {if(b > a) {return true} else {return false}},
        '<': function(a,b) {if(b < a) {return true} else {return false}},
        '>=': function(a,b) {if(b >= a) {return true} else {return false}},
        '<=': function(a,b) {if(b <= a) {return true} else {return false}}
    }

    for (let i_alertas in alertas) {

       
        const parametro_id = alertas[i_alertas].dataValues.parametro_id
        const valor_delimitante = alertas[i_alertas].dataValues.valor_delimitante
        const operador = alertas[i_alertas].dataValues.operador


        for (let i_medidas in medidas) {

            
            if(parametro_id == medidas[i_medidas].dataValues.parametro_id) {
               
                let alerta_ultrapassado: boolean;
                alerta_ultrapassado = operators[operador](valor_delimitante, medidas[i_medidas].dataValues.valor_medida)
                
                
                if(alerta_ultrapassado == true) {
                    const evento: IEvento ={ 
                        id_parametro: medidas[i_medidas].dataValues.parametro_id,
                        id_medida: medidas[i_medidas].dataValues.id_medida,
                        id_alerta: alertas[i_alertas].dataValues.id_alerta,
                    }
                    eventosRepository.TruncateTable()
                    eventosRepository.create(evento)
                }
                
        }

    }
   
}


}