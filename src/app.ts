import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

import { routes } from './routes';

export const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/api', routes);
