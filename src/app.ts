import cors from 'cors';
import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';

import { models } from './middlewares';
import { routes } from './routes';

export const app = express();
const server = http.createServer(app);
const port = import.meta.env.VITE_PORT || '9000';

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(models);
app.use('/api', routes);

server.listen(port, () => console.log(`Server is running on port ${port}`));

process.on('unhandledRejection', (err: Error) => {
  console.log(`An error occurred: ${err.message}`);
  server.close(() => process.exit(1));
});
