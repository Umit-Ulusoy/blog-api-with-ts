import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';

import routes from './routes';
import errorHandler from '@middlewares/errorHandler';
import notFoundHandler from '@middlewares/notFoundHandler';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', routes);

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Hellos!');
});

// 404 handler
app.use(notFoundHandler);

// global error handler
app.use(errorHandler);

export default app;
