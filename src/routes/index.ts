import express from 'express';

import { wishes } from './wishes';

const router = express.Router();

router.use('/wishes', wishes(router));
router.use('*', (req, res) => res.redirect('/'));

export default router;
