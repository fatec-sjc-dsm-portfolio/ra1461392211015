// criando rotas
import { Router } from 'express';
import EstacaoController from '../controllers/estacaoController';

const estacaoRouter = Router();

const estacaoController = new EstacaoController();

estacaoRouter.get('/', (request, response) => {
  return response.json({ message: 'Hello World' });
});

estacaoRouter.get('/getAll', estacaoController.findAll);
estacaoRouter.get('/getOne/:id', estacaoController.findById);
estacaoRouter.get('/getOneByMac/:mac_adress', estacaoController.findByMacAddress);
estacaoRouter.post('/create', estacaoController.save);
estacaoRouter.put('/update', estacaoController.update);
estacaoRouter.delete('/delete/:id', estacaoController.delete);

export default estacaoRouter;