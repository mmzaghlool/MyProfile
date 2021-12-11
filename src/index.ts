import express, { Request, Response } from 'express';
import { middleWares } from 'nodejs-express-utils';
import cors from 'cors';
import routers from './routes';
import morgan from 'morgan';

const app = express();

// view engine setup
app.use(cors());
// register view engine
app.set('view engine', 'ejs');

// static files
app.use(express.static('public'));

// XSS Filter
app.use(middleWares.xssFilter());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Morgan logger
app.use(morgan('dev'));

// app.get('/', (_, res) => res.send('<p>Health check</p>'));
app.use(routers);

app.use((_: Request, res: Response) => res.redirect('/404'));

export default app;
