import express, { Request, Response } from 'express'
import { config } from 'dotenv';
import cors from 'cors'
import { Router } from 'express';
import { dbConnect } from './Config/dbConfig';
import Routers from './Routes';

config({
    path: '.env'
})

const App = express();

const port = process.env.PORT;

const route = Router();

App.use(express.json());
App.use(cors());
App.use(Routers)



route.get('/', (req, res) => {
    res.json({ message: 'hello world with Typescript' })
})

App.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    next()
})

dbConnect().then(() => {
    App.listen(port, () => {
        console.log(`Ouvindo em http://localhost:${port}`)
    })
}).catch(err => console.error('Error on db connect', err))
