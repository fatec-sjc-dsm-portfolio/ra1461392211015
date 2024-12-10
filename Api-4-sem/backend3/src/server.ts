import express, { Request, Response, Router } from 'express'
import routes from './routes';
import cors from 'cors';
import './config/enviroument'
import configuracaoCors from './config/cors';
import { Estacao } from './entities/Estacao';
import { Parametro } from './entities/Parametro';
import { TipoParametro } from './entities/TipoParametro';
import { Alerta } from './entities/Alerta';
import { Usuario } from './entities/Usuario';
import { Medida } from './entities/Medida';
import { Evento } from './entities/Evento';

import { jobEventos } from './services/jobEventos';


const PORT = process.env.PORT?? 4512;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(configuracaoCors.configcors()));

app.use(routes);

// Chame o método sync para sincronizar o modelo Parametro com o banco de dados
(async () => {
  try {
    await Estacao.sync({ alter: true });
    await TipoParametro.sync({ alter: true });
    await Parametro.sync({ alter: true });
    await Alerta.sync({ alter: true });
    await Usuario.sync({ alter: true });
    await Medida.sync({ alter: true });
    await Evento.sync({ alter: true });
    console.log('Sincronizado com sucesso.');
  } catch (error) {
    console.error('Erro ao sincronizar:', error);
  }
})();


jobEventos()

app.listen(PORT, () => {
  console.log(`Servidor está ouvindo na porta ${PORT} no ambiente ${process.env.NODE_ENV}`);
});