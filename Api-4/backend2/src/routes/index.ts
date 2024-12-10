import { Router, Request, Response } from "express";
import estacaoRouter from "./estacao.routes";
import tipoParametroRouter from "./tipoParametro.routes";
import parametroRoutes from "./parametro.routes";
import medidaRouter from "./medida.routes";
import arduinorouter from "./arduino.routes";



const routes = Router();

routes.use("/Estacao", estacaoRouter)
routes.use("/TipoParametro", tipoParametroRouter)
routes.use("/Parametro", parametroRoutes)
routes.use("/Medida", medidaRouter)
routes.use("/teste", arduinorouter)


// underscore atua como um espaço reservado para um argumento que desejamos ignorar
routes.use((_: Request, res: Response) => res.json({ error: "Requisição desconhecida" }));

export default routes;