import express from 'express';

import { addWish, deleteWish, getWish, getWishes, updateWish } from '../controllers';

const router = express.Router();

export const wishes = () => {
  router.get('/wishes', getWishes);
  router.get('/wishes/:id', getWish);
  router.post('/wishes', addWish);
  router.put('/wishes/:id', updateWish);
  router.delete('/wishes/:id', deleteWish);

  return router;
};
