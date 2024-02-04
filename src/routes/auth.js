const express = require('express');
const controllers = require('../controllers');

const routes = express.Router();

routes.post('/login', controllers.auth.login);
routes.get('/logout', controllers.auth.logout);

module.exports = routes;
