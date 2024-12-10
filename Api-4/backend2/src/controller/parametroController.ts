import { Request, Response } from "express";
import { IParametro } from "../interfaces/IParametro";
import ParametroRepository from "../repository/ParametroRepository";

const parametroRepository = new ParametroRepository();

export default class ParametroController {
    async findAll(Request: Request, Response: Response) {
        try {
            const parametros = await parametroRepository.findAll();
            Response.status(200).json(parametros);
        } catch (error) {
            console.error(error);
            Response.status(500).json('Internal Server error');
        }
    }

    async findById(Request: Request, Response: Response) {
        try {
            const id_parametro = parseInt(Request.params.id);
            const parametro = await parametroRepository.findById(id_parametro);
            Response.status(200).json(parametro);
        } catch (error) {
            console.error(error);
            Response.status(500).json('Internal Server error');
        }
    }

    async save(Request: Request, Response: Response) {
        try {
            const parametro: IParametro = Request.body;
            await parametroRepository.create(parametro);
            Response.status(201).json(parametro);
        } catch (error) {
            console.error(error);
            Response.status(500).json('Internal Server error');
        }
    }

    async update(Request: Request, Response: Response) {
        try {
            const parametro: IParametro = Request.body;
            await parametroRepository.update(parametro);
            Response.status(200).json(parametro);
        } catch (error) {
            console.error(error);
            Response.status(500).json('Internal Server error');
        }
    }

    async delete(Request: Request, Response: Response) {
        try {
            const id_parametro = parseInt(Request.params.id);
            await parametroRepository.softDelete(id_parametro);
            Response.status(200).json('Parametro removido com sucesso!');
        } catch (error) {
            console.error(error);
            Response.status(500).json('Internal Server error');
        }
    }
}
