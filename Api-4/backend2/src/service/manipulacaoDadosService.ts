import { ArduinoRepository } from '../repository/RetornoArduinoRepository';
import {ArduinoService} from '../service/arduinoService'
import EstacaoRepository from "../repository/EstacaoRepository";
import ParametroRepository from '../repository/ParametroRepository';
import TipoParametroRepository from '../repository/TipoParametroRepository';
import { IMedida } from "../interfaces/IMedida";
import MedidaRepository from '../repository/MedidaRepository';


export async function manipular() {
    const repository = new ArduinoRepository();
    const service = new ArduinoService(repository);
    const estacaoRepository = new EstacaoRepository();

  
    const result = await service.fetchDataFromRepository();

    for (let i = 0; i < result.length; i++) {

        const retornoEstacao = await estacaoRepository.findByMacAddress(result[i].id);
        
        const idEstacao = retornoEstacao.dataValues.id_estacao;

        const listaIdTipoParam = await buscarIdTipoParametro(idEstacao);

        const listaIdParam = await buscarIdParametros(idEstacao)

        const listaObjTipoParam = await  buscarDadosTipoParam(listaIdTipoParam);
    
        VericarInclusaoEExcluirJson(listaObjTipoParam, result[i], listaIdParam)

    }
    
   }

  async function buscarIdTipoParametro(id_estacao) {
    
    const parametroRepository = new ParametroRepository(); 

    try {
        let listaIdTipoParam = []
        const resultado = await parametroRepository.findByEstacao(id_estacao); 
        for (let i = 0; i < resultado.length; i++) {
            listaIdTipoParam.push(resultado[i].dataValues.id_tipo_parametro)
            
        }
        return listaIdTipoParam
        
        
    } catch (error) {
        console.error(error);
    }
}

async function buscarIdParametros(id_estacao) {
    
    const parametroRepository = new ParametroRepository(); 

    try {
        let listaIdParam = []
        const resultado = await parametroRepository.findByEstacao(id_estacao); 
        for (let i = 0; i < resultado.length; i++) {
            listaIdParam.push(resultado[i].dataValues.id_parametro)
            
        }
        return listaIdParam
        
        
    } catch (error) {
        console.error(error);
    }
}


async function buscarDadosTipoParam(listaIdTipoParam) {
    const tipoParametroRepository = new TipoParametroRepository();
    let listaObjTipoParam = []
    for (let i = 0; i < listaIdTipoParam.length; i++){
        const retornoTipoParam = await tipoParametroRepository.findById(listaIdTipoParam[i]);
        listaObjTipoParam.push(retornoTipoParam.dataValues);
    }
    return listaObjTipoParam;
}

async function calculoMedidas(listaObjTipoParam, jsonMongo, listaIdParam) {

    for (let i = 0; i < listaObjTipoParam.length; i++){
        const nomeCampo = listaObjTipoParam[i].nome_campo_json
        const fator = listaObjTipoParam[i].fator
        const offset = listaObjTipoParam[i].offset
        const valor = jsonMongo[nomeCampo]
        const medida = valor * fator + offset
        const parametroId = listaIdParam[i]
        const unixTime = jsonMongo.time
        inserirMedidas(parametroId, medida, unixTime)
    }
}

async function inserirMedidas(parametro_id, valor_medida, unixtime) {
    const medidaRepository = new MedidaRepository(); 
    const medida: IMedida = {
        parametro_id: parametro_id,
        valor_medida: valor_medida,
        unixtime: unixtime
    };
    medidaRepository.create(medida)
}

async function VericarInclusaoEExcluirJson(listaObjTipoParam, jsonMongo, listaIdParam) {
    try {
      await calculoMedidas(listaObjTipoParam, jsonMongo, listaIdParam);
      const arduinoRepository = new ArduinoRepository();
      const deleteResult = await arduinoRepository.deleteData(jsonMongo._id);
      if (deleteResult) {
        console.log('Exclusão realizada com sucesso.');
      } else {
        console.log('Nenhum documento excluído.');
      }
    } catch (error) {
      console.error('Erro ao executar e verificar as operações:', error);
    }
  }