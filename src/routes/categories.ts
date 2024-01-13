import express from 'express';

import { categories } from 'controllers';

export const routes = express.Router();

routes.get('/', categories.getAll);
