import { IHealthProblems } from './../Interfaces/health-problems.interface';
import ClientSchema from "../Schemas/clientSchema";
import { ICreateClient } from "Interfaces/createClient.interface";
import CalculateScore from '../Utils/calculateScore';


export class ClientsModel {

    public insertClient = async (user: ICreateClient) => {
        try {
            const clientCreated = new ClientSchema({ ...user });
            const savedClient = await clientCreated.save();
            console.log('Client Saved Successfully!');
            return savedClient;
        }
        catch (e) {
            console.log('Error saving client:');
            console.log(e);
            throw e;
        }
    };

    public getClients = async (filter: string, skip: number, limit: number) => {
        try {
            filter = filter || '';
            const clients = await ClientSchema.find({
                $or: [
                    { name: new RegExp('.*' + filter + '.*', 'i') },
                    { dateOfBirth: new RegExp('.*' + filter + '.*', 'i') },
                    { gender: new RegExp('.*' + filter + '.*', 'i') },
                ],
            })
                .skip(skip || 0)
                .limit(limit || 0);
            return clients;
        } catch (e) {
            console.log('Error Finding Users', e);
            return null;
        }
    };


    public deleteClient = async (id: string) => {
        try {
            const deletedClient = await ClientSchema.findByIdAndRemove(id);
            return deletedClient;
        } catch (e) {
            console.log('Error on Delete User:', e);
        }
    }

    public updateClient = async (id: string, update: Partial<ICreateClient>) => {
        try {
            const updatedClient = await ClientSchema.findByIdAndUpdate(id, update);
            return updatedClient;
        } catch (err) {
            console.log('Error on Updated User:', err);
        }
    }

    public addHealthProblem = async (id: string, update: IHealthProblems) => {
        try {
            const user = await ClientSchema.findById(id);
            if (!user) {
                throw new Error("Usuário não Cadastrado em Nossa Base de Dados");
            }

            const previousHealthProblems = user?.healthProblems;
            const existingProblem = previousHealthProblems?.find(
                (problem) =>
                    problem.name?.toLowerCase() === update.problem_name?.toLowerCase() &&
                    problem.degree?.toLowerCase() === update.degree?.toLowerCase()
            );

            if (!existingProblem) {
                previousHealthProblems?.push(update);
            } else {
                console.log("Erro ao Adicionar Problema de Saúde");
            }

            const updatedUser = await ClientSchema.findByIdAndUpdate(id, {
                healthProblems: previousHealthProblems,
            });

            return updatedUser;
        } catch (err) {
            console.log('Error on Updated User');
            console.log(err);
            throw err;
        }
    };

    public getUsersMoreRisk = async () => {
        try {
            const list = await ClientSchema.find();
            const listSum = list.map(function (user) {
                const result = user.healthProblems.reduce(function (acumulador, value) {
                    const degreeAsNumber = parseFloat(value.degree ?? "");
                    if (!isNaN(degreeAsNumber)) {
                        return acumulador + degreeAsNumber;
                    } else {
                        return acumulador;
                    }
                }, 0);

                return { id: user.id, sd: result };
            });
            if (listSum) {
                const tenMore = CalculateScore(listSum)
                return tenMore
            }
        } catch (error) {
            console.log(error);
        }
    }
}
