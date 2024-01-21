import express from 'express';

import { auth } from '../controllers';

export const routes = express.Router();

routes.post('/login', auth.login);
routes.get('/logout', auth.logout);
