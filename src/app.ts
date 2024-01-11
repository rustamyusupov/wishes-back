import http from 'http';
import express from 'express';

import routes from 'routes';

export const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', routes);

const server = http.createServer(app);
const port = process.env.PORT || '9000';

server.listen(port, () => console.log(`Server alive on port ${port}`));
