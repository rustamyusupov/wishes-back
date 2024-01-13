import express from 'express';

import { routes as auth } from './auth';
import { routes as categories } from './categories';
import { routes as currencies } from './currencies';
import { routes as wishes } from './wishes';

export const routes = express.Router();

routes.use('/auth', auth);
routes.use('/categories', categories);
routes.use('/currencies', currencies);
routes.use('/wishes', wishes);
routes.use('*', (req, res) => res.redirect('/'));
