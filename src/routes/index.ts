import express from 'express';

import { getWishesRouter } from './wishes';

const router = express.Router();

router.use('/wishes', getWishesRouter(router));
router.use('*', (req, res) => res.redirect('/'));

export default router;
