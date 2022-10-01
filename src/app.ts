import 'dotenv/config';
/** This env_config file import should always be at the top
 *  Dont import any other module before this
 *  Added by vignesh
 */
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './routes';
import './model';

const app: Application = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.send('Server is running');
});

/** Routes */
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 80;

app.listen(PORT, () => console.log(`🚀 started at ${PORT}`));
