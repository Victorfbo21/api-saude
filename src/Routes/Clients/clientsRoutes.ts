import { Router } from 'express'
import { ClientsController } from '../../Controller/clientsController';

const ClientsRouter = Router();
const clientsController = new ClientsController();

ClientsRouter.get('/list', (req, res) => {
    return clientsController.getClients(req, res)
})

ClientsRouter.put('/create', (req, res) => {
    return clientsController.insertClient(req, res)
})

ClientsRouter.delete('/delete', (req, res) => {
    return clientsController.deleteClient(req, res)
})

ClientsRouter.patch('/update', (req, res) => {
    return clientsController.updateClient(req, res)
})

ClientsRouter.patch('/addHealthProblem', (req, res) => {
    return clientsController.addHealthProblem(req, res)
})

ClientsRouter.get('/risk', (req, res) => {
    return clientsController.getTenMoreRisk(req, res)
})


export default ClientsRouter;