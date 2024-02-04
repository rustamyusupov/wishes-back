const express = require('express');

const auth = require('./auth');
const categories = require('./categories');
const currencies = require('./currencies');
const wishes = require('./wishes');

const routes = express.Router();

routes.use('/auth', auth);
routes.use('/categories', categories);
routes.use('/currencies', currencies);
routes.use('/wishes', wishes);
routes.use('*', (req, res) => res.redirect('/'));

module.exports = routes;
