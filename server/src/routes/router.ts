import express from 'express';
const router = express.Router();

import indexRouter from './index';
import catchAll from './404';

router.use('/', indexRouter);

//make sure to be last to be catchall
router.use(catchAll);
export default router;
