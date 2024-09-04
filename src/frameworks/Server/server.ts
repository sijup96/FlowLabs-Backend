import express, { urlencoded } from 'express'
import cors from 'cors';
import { ORIGIN_URL } from '../../shared/constants';
import morgan from 'morgan';
import { envConfig } from '../../shared/config/env.config';
import indexRouter from '../routes/index.router'

export const createServer = async () => {
    try {
        const app = express();
        app.use(cors({
            origin: ORIGIN_URL,
            credentials: true
        }));
        app.use(morgan('dev'));
        app.use(urlencoded({ extended: true }));
        app.use(express.json());
        app.use('/',indexRouter)
        app.listen(envConfig.PORT,()=>console.log(`server running on port ${envConfig.PORT}`))
    } catch (error) {
        console.log(error)
    }

}