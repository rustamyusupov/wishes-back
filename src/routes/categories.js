const express = require('express');

const controllers = require('../controllers');

const routes = express.Router();

routes.get('/', controllers.categories.getAll);

module.exports = routes;
