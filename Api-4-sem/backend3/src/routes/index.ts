import { Router, Request, Response } from "express";
import alertaRouter from "./alerta.routes";
import estacaoRouter from "./estacao.routes";
import tipoParametroRouter from "./tipoParametro.routes";
import parametroRoutes from "./parametro.routes";
import medidaRouter from "./medida.routes";
import eventoRouter from "./evento.routes";
import usuarioRouter from "./usuario.routes";
import AuthRoutes from "./auth.routes";
import { authMiddleware } from "../middleware/authMiddleware";


const routes = Router();

routes.use("/Alerta", authMiddleware, alertaRouter)
routes.use("/Estacao", authMiddleware,  estacaoRouter)
routes.use("/TipoParametro", authMiddleware,  tipoParametroRouter)
routes.use("/Parametro", authMiddleware,  parametroRoutes)
routes.use("/Medida", authMiddleware,  medidaRouter)
routes.use("/Evento", authMiddleware,  eventoRouter)
routes.use("/Usuario", authMiddleware,  usuarioRouter)
routes.use("/Auth", AuthRoutes)

// underscore atua como um espaço reservado para um argumento que desejamos ignorar
routes.use((_: Request, res: Response) => res.json({ error: "Requisição desconhecida" }));

export default routes;