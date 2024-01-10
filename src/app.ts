import http from 'http';
import express from 'express';

import { router } from './router';

export const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', router);

const server = http.createServer(app);
const port = process.env.PORT || '9000';

server.listen(port, () => console.log(`Server alive on port ${port}`));
