import { Router } from "express";
import ParametroController from "../controller/parametroController";



const parametroRoutes = Router();
const parametroController = new ParametroController();

// hello world
parametroRoutes.get('/', (request, response) => {
    response.json('Hello World!');
});

parametroRoutes.get('/getAll', parametroController.findAll);
parametroRoutes.get('/getOne/:id', parametroController.findById);
parametroRoutes.post('/create', parametroController.save);
parametroRoutes.put('/update', parametroController.update);
parametroRoutes.delete('/delete/:id', parametroController.delete);

export default parametroRoutes;