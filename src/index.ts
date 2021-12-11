import express, { Request, Response } from 'express';
import { middleWares } from 'nodejs-express-utils';
import cors from 'cors';
import routers from './routes';

const app = express();

// view engine setup
app.use(cors());
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
app.use(middleWares.xssFilter());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.get('/', (_, res) => res.send('<p>Health check</p>'));
app.use('/v1', routers);

app.all('*', (_: Request, res: Response) => res.status(404).json({ success: false, code: 'NOT_FOUND' }));

export default app;
