import { Request, Response } from "express";
import { IEstacao } from "../interfaces/IEstacao";
import EstacaoRepository from "../repository/EstacaoRepository";

const estacaoRepository = new EstacaoRepository();

export default class EstacaoController {
    async findAll(Request: Request, Response: Response) { 
        try {
            const estacoes = await estacaoRepository.findAll();
            console.log(estacoes);
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
