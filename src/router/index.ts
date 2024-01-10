import express from 'express';

import { wishes } from './wishes';

export const router = express.Router();

router.use('/wishes', wishes(router));
router.use('*', (req, res) => res.redirect('/'));
