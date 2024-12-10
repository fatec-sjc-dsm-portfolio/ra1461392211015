import express, { Request, Response, Router } from 'express'
import routes from './routes';
import cors from 'cors';
import './config/enviroument'
import configuracaoCors from './config/cors';
import { Estacao } from './entities/Estacao';
import { Parametro } from './entities/Parametro';
import { TipoParametro } from './entities/TipoParametro';
import { Medida } from './entities/Medida';
import { MongoClient } from './config/dbMongo';
import { getAllData } from './controller/retornoArduinoController';
import { ArduinoRepository } from './repository/RetornoArduinoRepository';
import {ArduinoService} from './service/arduinoService'
import { manipular } from './service/manipulacaoDadosService';
import {job} from './service/jobServicce'



const main = async () => {

  const PORT = process.env.PORT?? 5000;

  const app = express();
  
  
  
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors(configuracaoCors.configcors));
  
  app.use(routes);

  await MongoClient.connect();
  

  // manipular()
  job()

  
  app.listen(PORT, () => {
    console.log(`Servidor está ouvindo na porta ${PORT} no ambiente ${process.env.NODE_ENV}`);

    
  });


}

main();

