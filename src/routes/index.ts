import express from 'express';

import { routes as auth } from './auth';
import { routes as wishes } from './wishes';

export const routes = express.Router();

routes.use('/auth', auth);
routes.use('/wishes', wishes);
routes.use('*', (req, res) => res.redirect('/'));
