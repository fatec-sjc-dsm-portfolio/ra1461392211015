import { Request, Response } from "express";
import { IEstacao } from "../Interfaces/IEstacao";
import EstacaoRepository from "../repositories/EstacaoRepository";
import TipoParametroRepository from "../repositories/TipoParametroRepository";
import ParametroRepository from "../repositories/ParametroRepository";
import { IParametro } from "../Interfaces/IParametro";

const estacaoRepository = new EstacaoRepository();
const tipoParam = new TipoParametroRepository();
const param = new ParametroRepository();


export default class EstacaoController {
    async findAll(Request: Request, Response: Response) {
        try {
            const estacoes = await estacaoRepository.findAll();
            return Response.status(200).json(estacoes);
        } catch (error) {
            console.error(error);
            return Response.status(500).json('Internal Server error');
        }
    }

    async findById(Request: Request, Response: Response) {
        try {
            const id_estacao = parseInt(Request.params.id);
            const estacao = await estacaoRepository.findById(id_estacao);
            Response.status(200).json(estacao);
        } catch (error) {
            console.error(error);
            Response.status(500).json('Internal Server error');
        }
    }

    async findByMacAddress(Request: Request, Response: Response) {
        try {
            const mac_adress = Request.params.mac_adress;
            const estacao = await estacaoRepository.findByMacAddress(mac_adress);
            Response.status(200).json(estacao);
        } catch (error) {
            console.error(error);
            Response.status(500).json('Internal Server error');
        }
    }

    async save(Request: Request, Response: Response) {
        try {
            const estacao: IEstacao = Request.body;
            await estacaoRepository.create(estacao);
            if (estacao.id_tipos_parametros) {
                const ids = estacao.id_tipos_parametros;
                ids.forEach(async (id) => {
                    const mac_adress = estacao.mac_adress;
                    const find = await estacaoRepository.findByMacAddress(mac_adress);
                    const id_estacao = find.get().id_estacao;
                    if (id_estacao) {
                        let Parametro: IParametro = {
                            id_estacao: id_estacao,
                            id_tipo_parametro: id
                        }
                        console.log('here', Parametro)
                        await param.create(Parametro)
                    }
                });
            }
            Response.status(201).json(estacao);
        } catch (error) {
            console.error(error);
            Response.status(500).json('Internal Server error');
        }
    }

    async update(Request: Request, Response: Response) {
        try {
            const estacao: IEstacao = Request.body;
            await estacaoRepository.update(estacao);
            Response.status(200).json(estacao);
        } catch (error) {
            console.error(error);
            Response.status(500).json('Internal Server error');
        }
    }

    async delete(Request: Request, Response: Response) {
        try {
            const id_estacao = parseInt(Request.params.id);
            await estacaoRepository.softDelete(id_estacao);
            Response.status(200).json('Estação deletada com sucesso!');
        } catch (error) {
            console.error(error);
            Response.status(500).json('Internal Server error');
        }
    }

}
