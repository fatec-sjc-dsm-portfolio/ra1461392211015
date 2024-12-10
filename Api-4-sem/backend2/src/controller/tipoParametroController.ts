import TipoParametroRepository from "../repository/TipoParametroRepository";
import { ITipoParametro } from "../interfaces/ITipoParametro";
import { Request, Response } from "express";

const tipoParametroRepository = new TipoParametroRepository();
export default class TipoParametroController {
    async findAll(Request: Request, Response: Response) {
        try {
            const tipoParametros = await tipoParametroRepository.findAll();
            Response.status(200).json(tipoParametros);
        } catch (error) {
            console.error(error);
            Response.status(500).json('Internal Server error');
        }
    }

    async findById(Request: Request, Response: Response) {
        try {
            const id_tipo_parametro = parseInt(Request.params.id);
            const tipoParametro = await tipoParametroRepository.findById(id_tipo_parametro);
            Response.status(200).json(tipoParametro);
        } catch (error) {
            console.error(error);
            Response.status(500).json('Internal Server error');
        }
    }

    async save(Request: Request, Response: Response) {
        try {
            const tipoParametro: ITipoParametro = Request.body;
            await tipoParametroRepository.create(tipoParametro);
            Response.status(201).json(tipoParametro);
        } catch (error) {
            console.error(error);
            Response.status(500).json('Internal Server error');
        }
    }

    async delete(Request: Request, Response: Response) {
        try {
            const id_tipo_parametro = parseInt(Request.params.id);
            await tipoParametroRepository.softDelete(id_tipo_parametro);
            Response.status(200).json('Tipo Parametro removido com sucesso!');
        } catch (error) {
            console.error(error);
            Response.status(500).json('Internal Server error');
        }
    }

    async update(Request: Request, Response: Response) {
        try {
            const tipoParametro: ITipoParametro = Request.body;
            await tipoParametroRepository.update(tipoParametro);
            Response.status(200).json(tipoParametro);
        } catch (error) {
            console.error(error);
            Response.status(500).json('Internal Server error');
        }
    }
}