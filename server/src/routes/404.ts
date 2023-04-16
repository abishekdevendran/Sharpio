import express from 'express';
const router = express.Router();

import catchAll from '../controllers/404Controller';

router.all('*', catchAll);

export default router;
