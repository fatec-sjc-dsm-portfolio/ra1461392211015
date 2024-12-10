import { ObjectId, Collection } from 'mongodb';
// import MongoDBConnection from '../config/dbMongo';
import { IRetornoArduino } from '../interfaces/IRetornoArduino';
import { RetornoArduino } from '../entities/RetornoArduino';
import { MongoClient } from '../config/dbMongo';


export class ArduinoRepository implements IRetornoArduino {

  async getData(): Promise<RetornoArduino[]> {
    const dados = await MongoClient.db
      .collection<RetornoArduino>("dadosEstacao")
      .find({})
      .toArray();
  
    return dados;

  }

  async deleteData(id: string): Promise<boolean> {
    try {
      const result = await MongoClient.db
        .collection<RetornoArduino>('dadosEstacao')
        .deleteOne({ _id: new ObjectId(id) }); // Supondo que o id seja um ObjectId válido

      if (result.deletedCount && result.deletedCount > 0) {
        return true; // Se pelo menos um documento for excluído com sucesso
      } else {
        return false; // Se nenhum documento for excluído
      }
    } catch (error) {
      console.error('Erro ao excluir dados:', error);
      return false; // Em caso de erro, retorne falso
    }
  }
}

    



