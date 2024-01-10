import { Router } from 'express';

import { addWish, deleteWish, getWish, getWishes, updateWish } from '../controllers';

export const wishes = (router: Router) => {
  router.get('/wishes', getWishes);
  router.get('/wishes/:id', getWish);
  router.post('/wishes', addWish);
  router.put('/wishes/:id', updateWish);
  router.delete('/wishes/:id', deleteWish);

  return router;
};
