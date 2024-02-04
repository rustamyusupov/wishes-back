const express = require('express');

const controllers = require('../controllers');

const routes = express.Router();

routes.get('/', controllers.currencies.getAll);

module.exports = routes;
