import { Router } from "express";
import MedidaController from "../controllers/medidaController";

const medidaRouter = Router();
const medidaController = new MedidaController();

medidaRouter.get("/", async (request, response) => {
    response.json({ message: "Hello, World!" });
});

medidaRouter.get("/getAll", medidaController.findAll);
medidaRouter.get("/getOne/:id", medidaController.findById);
medidaRouter.post("/create", medidaController.save);
medidaRouter.put("/update", medidaController.update);
medidaRouter.delete("/delete/:id", medidaController.delete);
medidaRouter.get("/bateria/:id_estacao/:id_tipo_parametro", medidaController.bateria);
medidaRouter.get("/coletaDados/:id_estacao/:comeco/:final", medidaController.coletaDados);

export default medidaRouter;
