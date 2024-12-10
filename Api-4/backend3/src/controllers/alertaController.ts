import AlertaRepository from "../repositories/AlertaRepository";
import { IAlerta } from "../Interfaces/IAlerta";
import { Request, Response } from "express";

const alertaRepository = new AlertaRepository();
export default class AlertaController {
    async findAll(Request: Request, Response: Response) {
        try {
            const alertas = await alertaRepository.findAll();
            return Response.status(200).json(alertas);
        } catch (error) {
            console.error(error);
            return Response.status(500).json('Internal Server error');
        }
    }
    async findById(Request: Request, Response: Response) {
        try {
            const id_alerta = parseInt(Request.params.id);
            const alerta = await alertaRepository.findById(id_alerta);
            return Response.status(200).json(alerta);
        } catch (error) {
            console.error(error);
            return Response.status(500).json('Internal Server error');
        }
    }
    async save(Request: Request, Response: Response) {
        try {
            const alerta: IAlerta = Request.body;
            await alertaRepository.create(alerta);
            return Response.status(201).json(alerta);
        } catch (error) {
            console.error(error);
            return Response.status(500).json('Internal Server error');
        }
    }
    async update(Request: Request, Response: Response) {
        try {
            const alerta: IAlerta = Request.body;
            await alertaRepository.update(alerta);
            return Response.status(200).json(alerta);
        } catch (error) {
            console.error(error);
            return Response.status(500).json('Internal Server error');
        }
    }
    async Delete(Request: Request, Response: Response) {
        try {
            const id_alerta = parseInt(Request.params.id);
            await alertaRepository.Delete(id_alerta);
            return Response.status(200).json('Alerta deletado com sucesso!');
        } catch (error) {
            console.error(error);
            return Response.status(500).json('Internal Server error');
        }
    }
}