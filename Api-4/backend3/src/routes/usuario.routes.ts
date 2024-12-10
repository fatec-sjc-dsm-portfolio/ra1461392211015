// criando hello router e instaciando controller

import { Router } from 'express';
import UsuarioController from '../controllers/usuarioController';

const usuarioRouter = Router();
const usuarioController = new UsuarioController();

usuarioRouter.get('/', async (request, response) => {
    response.json({ message: 'Hello World' });
});

usuarioRouter.get('/getAll', usuarioController.findAll);
usuarioRouter.get('/getOne/:id', usuarioController.findById);
usuarioRouter.get('/getOneByEmail/:email', usuarioController.findByEmail);
usuarioRouter.get('/getByLogin', usuarioController.findByEmailAndSenha);
usuarioRouter.post('/create', usuarioController.save);
usuarioRouter.put('/update', usuarioController.update);
usuarioRouter.delete('/delete/:id', usuarioController.delete);
usuarioRouter.get('/login', usuarioController.login);

export default usuarioRouter;