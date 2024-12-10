import MedidaRepository from "../repositories/MedidaRepository";
import { IMedida } from "../Interfaces/IMedida";
import { Dados } from "../helpers/Dados";
import { Request, Response } from "express";
import ParametroRepository from "../repositories/ParametroRepository";
import teste from "../helpers/coletor";
import coletor from "../helpers/coletor";
const medidaRepository = new MedidaRepository();
const parametroRepository = new ParametroRepository();
export default class MedidaController {
    async findAll(Request: Request, Response: Response) {
        try {
            const medidas = await medidaRepository.findAll();
            Response.status(200).json(medidas);
        }
        catch (error) {
            console.error(error);
            Response.status(500).json('Internal Server error');
        }
    }
    async findById(Request: Request, Response: Response) {
        try {
            const id_medida = parseInt(Request.params.id);
            const medida =  await medidaRepository.findById(id_medida);
            Response.status(200).json(medida);
        }
        catch (error) {
            console.error(error);
            Response.status(500).json('Internal Server error');
        }
    }
    async save(Request: Request, Response: Response) {
        try {
            const medida: IMedida = Request.body;
            await medidaRepository.create(medida);
            Response.status(201).json(medida);

        }
        catch (error) {
            console.error(error);
            Response.status(500).json('Internal Server error');
        }
    }
    async update(Request: Request, Response: Response) {
        try {
            const medida: IMedida = Request.body;
            await medidaRepository.update(medida);
            Response.status(200).json(medida);
        }
        catch (error) {
            console.error(error);
        }
    }
    async delete(Request: Request, Response: Response) {
        try {
            const id_medida = parseInt(Request.params.id);
            await medidaRepository.Delete(id_medida);
            Response.status(200).json('Medida removida com sucesso!');

        }
        catch (error) {
            console.error(error);
            Response.status(500).json('Internal Server error');
        }
    }
    async bateria(Request: Request, Response: Response) {
        try {
            const id_estacao = parseInt(Request.params.id_estacao);
            const id_tipo_parametro = parseInt(Request.params.id_tipo_parametro);

            const id_parametro = (await parametroRepository.findByEstacaoTipoParametro(id_estacao, id_tipo_parametro))[0].dataValues.id_parametro;
            const bat = await medidaRepository.findMaisNova(id_parametro);
            Response.status(200).json(bat);

        }
        catch (error) {
            console.error(error);
            Response.status(500).json('Internal Server error');
        }
    }
    async coletaDados(Request: Request, Response: Response) {
        try {
            const id_estacao = parseInt(Request.params.id_estacao);
            const timeComeco = parseInt(Request.params.comeco);
            const timeFinal = parseInt(Request.params.final)
            const parametros = await parametroRepository.findByEstacao(id_estacao);
            const resultado = await coletor(parametros, timeComeco, timeFinal)
            Response.status(200).json(resultado);
        }
        catch (error) {
            console.error(error);
            Response.status(500).json('Internal Server error');
        }
    }
}