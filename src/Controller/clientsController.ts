import ClientModel from '../Model/clientModel';
import { ICreateClient } from 'Interfaces/createClient.interface';
import { IHealthProblems } from 'Interfaces/health-problems.interface';

const insertClient = async (req: any, res: any) => {
    try {
        const client = req.body;
        const created = await ClientModel.insertClient(client);
        if (created) {
            res.status(201).send(created);
        } else {
            res.sendStatus(500);
        }
    } catch (error) {
        console.error('Error inserting client:', error);
        res.sendStatus(500);
    }
}

const getClients = async (req: any, res: any) => {
    try {
        const find = await ClientModel.getClients(req.query.filter, req.query.skip, req.query.limit);
        if (find) {
            res.status(200).send(find);
        } else {
            res.sendStatus(500);
        }
    } catch (error) {
        console.error('Error getting clients:', error);
        res.sendStatus(500);
    }
}

const deleteClient = async (req: any, res: any) => {
    try {
        const id = req.query.id;
        const clientDeleted = await ClientModel.deleteClient(id);
        if (clientDeleted) {
            res.send(`Usuário ${clientDeleted._id} Foi Deletado`);
            res.sendStatus(200);
        } else {
            res.sendStatus(500);
        }
    } catch (error) {
        console.error('Error deleting client:', error);
        res.sendStatus(500);
    }
}

const updateClient = async (req: any, res: any) => {
    try {
        const id = req.query.id;
        const update: Partial<ICreateClient> = req.body;
        const clientUpdate = await ClientModel.updateClient(id, update);
        if (clientUpdate) {
            res.sendStatus(201);
            res.send(clientUpdate);
        } else {
            res.sendStatus(500);
        }
    } catch (error) {
        console.error('Error updating client:', error);
        res.sendStatus(500);
    }
}

const addHealthProblem = async (req: any, res: any) => {
    try {
        const id = req.query.id;
        const update: IHealthProblems = req.body;
        const clientUpdate = await ClientModel.addHealthProblem(id, update);
        if (clientUpdate) {
            res.send(clientUpdate);
        } else {
            res.sendStatus(500);
        }
    } catch (error) {
        console.error('Error adding health problem to client:', error);
        res.sendStatus(500);
    }
}


export default {
    insertClient,
    deleteClient,
    updateClient,
    getClients,
    addHealthProblem
}
