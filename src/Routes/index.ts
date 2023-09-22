import { Router } from "express";
import swaggerUi from 'swagger-ui-express'
import swaggerFile from "../Docs/swagger.json"
import ClientsRouter from "./Clients/clientsRoutes";

const Routers = Router();

Routers.use('/clients', ClientsRouter);
Routers.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));



export default Routers