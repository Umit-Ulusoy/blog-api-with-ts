import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';

import routes from './routes';
import errorHandler from '@middlewares/errorHandler';

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
app.use((req: Request, res: Response) => {
  res.status(404).json({
    status: false,
    message: 'Page not found!',
  });
});

// global error handler
app.use(errorHandler);

export default app;
