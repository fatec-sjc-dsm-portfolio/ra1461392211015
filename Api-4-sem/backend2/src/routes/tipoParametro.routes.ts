import e, { Router } from "express";
import TipoParametroController from "../controller/tipoParametroController";

const tipoParametroRouter = Router();
const tipoParametroController = new TipoParametroController();

// hello world
tipoParametroRouter.get('/', (request, response) => {
    response.json('Hello World!');
});

tipoParametroRouter.get('/getAll', tipoParametroController.findAll);
tipoParametroRouter.get('/getOne/:id', tipoParametroController.findById);
tipoParametroRouter.post('/create', tipoParametroController.save);
tipoParametroRouter.put('/update', tipoParametroController.update);
tipoParametroRouter.delete('/delete/:id', tipoParametroController.delete);

export default tipoParametroRouter;