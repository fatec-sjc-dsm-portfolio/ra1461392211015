import { Router } from "express";
import MedidaController from "../controller/medidaController";

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

export default medidaRouter;
