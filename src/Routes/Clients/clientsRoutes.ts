import { Router } from 'express'
import ClientsController from '../../Controller/clientsController';

const ClientsRouter = Router();

ClientsRouter.get('/list', (req, res) => {
    return ClientsController.getClients(req, res)
})

ClientsRouter.put('/create', (req, res) => {
    return ClientsController.insertClient(req, res)
})

ClientsRouter.delete('/delete', (req, res) => {
    return ClientsController.deleteClient(req, res)
})

ClientsRouter.patch('/update', (req, res) => {
    return ClientsController.updateClient(req, res)
})

export default ClientsRouter;