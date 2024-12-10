import { Request, Response } from 'express';
import RetornoArduinoModelo from '../entities/RetornoArduinoModel';
import { ArduinoRepository } from '../repository/RetornoArduinoRepository';



export async function getAllData(req: Request, res: Response) {
  const repository = new ArduinoRepository();
    try {
      const allData = await repository.getData();
      return allData;
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }