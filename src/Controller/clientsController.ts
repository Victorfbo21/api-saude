import { ICreateClient } from 'Interfaces/createClient.interface';
import { IHealthProblems } from 'Interfaces/health-problems.interface';
import { ClientsModel } from '../Model/clientModel';
export class ClientsController {

    private clientsModel: ClientsModel

    constructor() {
        this.clientsModel = new ClientsModel();
    }

    public insertClient = async (req: any, res: any) => {
        try {
            const client = req.body;
            const created = await this.clientsModel.insertClient(client);
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

    public getClients = async (req: any, res: any) => {
        try {
            const find = await this.clientsModel.getClients(req.query.filter, req.query.skip, req.query.limit);
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

    public deleteClient = async (req: any, res: any) => {
        try {
            const id = req.query.id;
            const clientDeleted = await this.clientsModel.deleteClient(id);
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

    public updateClient = async (req: any, res: any) => {
        try {
            const id = req.query.id;
            const update: Partial<ICreateClient> = req.body;
            const clientUpdate = await this.clientsModel.updateClient(id, update);
            if (clientUpdate) {
                res.send(clientUpdate);
            } else {
                res.sendStatus(500);
            }
        } catch (error) {
            console.error('Error updating client:', error);
            res.sendStatus(500);
        }
    }

    public addHealthProblem = async (req: any, res: any) => {
        try {
            const id = req.query.id;
            const update: IHealthProblems = req.body;
            const clientUpdate = await this.clientsModel.addHealthProblem(id, update);
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

    public getTenMoreRisk = async (req: any, res: any) => {
        try {
            const list = await this.clientsModel.getUsersMoreRisk();
            res.send(list)
        }
        catch (error) {
            console.log(error)
        }
    }
}

