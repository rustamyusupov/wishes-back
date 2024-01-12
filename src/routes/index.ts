import express from 'express';

import { wishes } from './wishes';

export const routes = express.Router();

routes.use('/wishes', wishes);
routes.use('*', (req, res) => res.redirect('/'));
