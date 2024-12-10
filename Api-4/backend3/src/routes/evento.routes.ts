import { Router } from 'express';
import EventoController from '../controllers/eventoController';

const eventoRouter = Router();
const eventoController = new EventoController();

eventoRouter.get('/', async (request, response) => {
    response.json({ message: 'Hello World' });
});

eventoRouter.get('/getAll', eventoController.findAll);
eventoRouter.get('/getOne/:id', eventoController.findById);
eventoRouter.post('/create', eventoController.save);
eventoRouter.put('/update', eventoController.update);
eventoRouter.delete('/delete/:id', eventoController.Delete);

export default eventoRouter;