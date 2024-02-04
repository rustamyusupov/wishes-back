const express = require('express');

const controllers = require('../controllers');
const middlewares = require('../middlewares');

const routes = express.Router();

routes.get('/', controllers.wishes.getAll);
routes.get('/:id', middlewares.auth, controllers.wishes.get);
routes.post('/', middlewares.auth, controllers.wishes.add);
routes.put('/:id', middlewares.auth, controllers.wishes.update);
routes.delete('/:id', middlewares.auth, controllers.wishes.remove);

module.exports = routes;
