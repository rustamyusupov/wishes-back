import cors from 'cors';
import express from 'express';
import http from 'http';

import { models, session } from 'middlewares';
import routes from 'routes';

export const app = express();
const server = http.createServer(app);
const port = import.meta.env.VITE_PORT || '9000';

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(models);
app.use(session);

app.use('/api', routes);

server.listen(port, () => console.log(`Server alive on port ${port}`));
