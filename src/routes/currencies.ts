import express from 'express';

import { currencies } from 'controllers';

export const routes = express.Router();

routes.get('/', currencies.getAll);
