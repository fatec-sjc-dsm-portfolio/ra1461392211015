import EventoRepository from "../repositories/EventoRepository";
import { IEvento } from "../Interfaces/IEvento";
import { Request, Response } from "express";

const eventoRepository = new EventoRepository();
export default class EventoController {
    async findAll(Request: Request, Response: Response) {
        try {
            const eventos = await eventoRepository.findAll();
            Response.status(200).json(eventos);
        } catch (error) {
            console.error(error);
            Response.status(500).json('Internal Server error');
        }
    }
    async findById(Request: Request, Response: Response) {
        try {
            const id_evento = parseInt(Request.params.id);
            const evento = await eventoRepository.findById(id_evento);
            Response.status(200).json(evento);
        } catch (error) {
            console.error(error);
            Response.status(500).json('Internal Server error');
        }
    }
    async save(Request: Request, Response: Response) {
        try {
            const evento: IEvento = Request.body;
            await eventoRepository.create(evento);
            Response.status(201).json(evento);
        } catch (error) {
            console.error(error);
            Response.status(500).json('Internal Server error');
        }
    }
    async update(Request: Request, Response: Response) {
        try {
            const evento: IEvento = Request.body;
            await eventoRepository.update(evento);
            Response.status(200).json(evento);
        } catch (error) {
            console.error(error);
            Response.status(500).json('Internal Server error');
        }
    }
    async Delete(Request: Request, Response: Response) {
        try {
            const id_evento = parseInt(Request.params.id);
            await eventoRepository.Delete(id_evento);
            Response.status(200).json('Evento removido com sucesso!');
        } catch (error) {
            console.error(error);
            Response.status(500).json('Internal Server error');
        }
    }
}