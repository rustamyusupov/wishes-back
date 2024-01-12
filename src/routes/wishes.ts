import express from 'express';

import { wishes } from 'controllers';
import { auth } from 'middlewares';

export const routes = express.Router();

routes.get('/', wishes.getAll);
routes.get('/:id', auth, wishes.get);
routes.post('/', auth, wishes.add);
routes.put('/:id', auth, wishes.update);
routes.delete('/:id', auth, wishes.remove);
