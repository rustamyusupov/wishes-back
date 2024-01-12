import express from 'express';

import { addWish, deleteWish, getWish, getWishes, updateWish } from 'controllers';

const routes = express.Router();

routes.get('/', getWishes);
routes.get('/:id', getWish);
routes.post('/', addWish);
routes.put('/:id', updateWish);
routes.delete('/:id', deleteWish);

export const wishes = routes;
