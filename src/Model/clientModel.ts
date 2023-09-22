import ClientSchema from "../Schemas/clientSchema";
import { ICreateClient } from "Interfaces/createClient.interface";


const insertClient = async (user: ICreateClient) => {
    const clientCreated = new ClientSchema({ ...user })
    return await clientCreated.save().then(
        (o) => {
            console.log('Client Saved Successfully!')
            return o
        }

    ).catch(
        (e) => {
            return e
        }
    )
}

const getClients = async (filter: string, skip: number, limit: number) => {
    filter = filter || ''
    return await ClientSchema.find({
        $or: [
            { name: new RegExp('.*' + filter + '.*', 'i') },
            { dateOfBirth: new RegExp('.*' + filter + '.*', 'i') },
            { gender: new RegExp('.*' + filter + '.*', 'i') },

        ]
    }).skip(skip || 0).limit(limit || 0).then(
        (o) => {
            return o
        }
    ).catch(
        (e) => {
            console.log('Error Finding Users', e)
            return null
        }
    )
}


const deleteClient = async (id: string) => {
    return await ClientSchema.findByIdAndRemove(id).then(
        (o) => {
            return o
        }
    ).catch(
        (e) => {
            console.log('Error on Delete User')
        }

    )
}

const updateClient = async (id: string, update: Partial<ICreateClient>) => {

    return await ClientSchema.findByIdAndUpdate(id, update)
        .then(
            (o) => {
                return o
            }
        ).catch(
            (e) => {
                console.log('Error on Updated User')
            }

        )
}


export default {
    insertClient,
    deleteClient,
    updateClient,
    getClients
}