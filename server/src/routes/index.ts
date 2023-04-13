import express from 'express';
const router = express.Router();

import indexController from '@/controllers/indexController';

import loginRouter from '@/routes/login';
import registerRouter from '@/routes/register';
import userRouter from '@/routes/user';

router.use('/login', loginRouter);
router.use('/register', registerRouter);
router.use('/user', userRouter);
router.get('/', indexController.indexControllerGet);

export default router;
