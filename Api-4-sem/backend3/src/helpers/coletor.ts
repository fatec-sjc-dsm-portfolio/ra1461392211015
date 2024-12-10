import MedidaRepository from "../repositories/MedidaRepository";
import TipoParametroRepository from "../repositories/TipoParametroRepository";
import { Dados } from "./Dados";
import formataLista from "./formataLista";

const medidaRepository = new MedidaRepository();
const tipoParametroRepository = new TipoParametroRepository();
export default async function coletor(parametros, timeComeco, timeFinal) {
    const dados = new Dados()
    let medidas = []
    for (let i = 0; i < parametros.length; i++) {
        medidas = await medidaRepository.coletaDados(parametros[i].id_parametro, timeComeco, timeFinal)
        if (medidas.length) {

            dados.atribuirDado(medidas[0].dataValues.parametro.dataValues.tipo_parametro.dataValues.nome_campo_json, medidas);
        } 
    }
    return dados
}