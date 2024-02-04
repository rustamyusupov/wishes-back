const cors = require('cors');
const express = require('express');
const http = require('http');

const routes = require('./routes');
const middlewares = require('./middlewares');

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || '9000';

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(middlewares.models);
app.use(middlewares.session);
app.use('/api', routes);

server.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
