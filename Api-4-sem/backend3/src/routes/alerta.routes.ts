// criando rotas de alerta
import { Router } from 'express';
import AlertaController from '../controllers/alertaController';

const alertaRouter = Router();
const alertaController = new AlertaController();

alertaRouter.get('/', (request, response) => {
  return response.json({ message: 'Hello World' });
});

alertaRouter.get('/getAll', alertaController.findAll);
alertaRouter.get('/getOne/:id', alertaController.findById);
alertaRouter.post('/create', alertaController.save);
alertaRouter.put('/update', alertaController.update);
alertaRouter.delete('/delete/:id', alertaController.Delete);

export default alertaRouter;