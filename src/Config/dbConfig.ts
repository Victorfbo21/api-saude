import mongoose from 'mongoose'

export const dbConnect = (): Promise<boolean> => {
    let MONGO_URL = `mongodb+srv://${process.env.DATABASE_URL}`
    MONGO_URL += `${process.env.DATABASE_PORT}`
    MONGO_URL += `/${process.env.DATABASE_DB}`
    mongoose.set('strictQuery', false)
    return mongoose.connect(MONGO_URL,
        {
            authSource: 'admin',
            user: process.env.DATABASE_USER,
            pass: process.env.DATABASE_PASSWORD,
            dbName: process.env.DATABASE_DB,

        },

    ).then(
        () => {
            console.log('Connected to', MONGO_URL)
            return true
        }
    ).catch(
        (e) => {

            console.log('DB connection error:', e)
            throw e
        }
    )
}
