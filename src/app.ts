import cors from 'cors';
import express from 'express';
import http from 'http';

import { models } from 'middlewares';
import routes from 'routes';

export const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(models());

app.use('/api', routes);

const server = http.createServer(app);
const port = process.env.PORT || '9000';

server.listen(port, () => console.log(`Server alive on port ${port}`));
