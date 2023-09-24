import ClientModel from '../Model/clientModel';
import { ICreateClient } from 'Interfaces/createClient.interface';
import { IHealthProblems } from 'Interfaces/health-problems.interface';

const insertClient = async (req: any, res: any) => {
    const client = req.body;
    const created = await ClientModel.insertClient(client)
    if (created) {
        res.status(201).send(created)
    }
    else {
        res.send(500)
    }
}

const getClients = async (req: any, res: any) => {
    const find = await ClientModel.getClients(req.query.filter, req.query.skip, req.query.limit)
    if (find) {
        res.status(200).send(find)
    } else {
        res.status(500)
    }
}

const deleteClient = async (req: any, res: any) => {
    const id = req.query.id
    const clientDeleted = await ClientModel.deleteClient(id)
    if (clientDeleted) {
        res.send('Usuário :', clientDeleted._id, 'Foi Deletado')
        res.sendStatus(200)
    } else {
        res.send(500)
    }
}

const updateClient = async (req: any, res: any) => {
    const id = req.query.id
    const update: Partial<ICreateClient> = req.body
    const clientUpdate = await ClientModel.updateClient(id, update)
    if (clientUpdate) {
        res.sendStatus(201)
        res.send(clientUpdate)
    } else {
        res.sendStatus(500)
    }
}

const addHealthProblem = async (req: any, res: any) => {
    const id = req.query.id
    const update: IHealthProblems = req.body
    const clientUpdate = await ClientModel.addHealthProblem(id, update)
    if (clientUpdate) {
        res.send(clientUpdate)
    } else {
        res.sendStatus(500)
    }
}


export default {
    insertClient,
    deleteClient,
    updateClient,
    getClients,
    addHealthProblem
}
