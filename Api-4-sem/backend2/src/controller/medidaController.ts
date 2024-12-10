import MedidaRepository from "../repository/MedidaRepository";
import { IMedida } from "../interfaces/IMedida";
import { Request, Response } from "express";
const medidaRepository = new MedidaRepository();
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
}