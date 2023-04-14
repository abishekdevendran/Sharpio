import statsController from '@/controllers/statsController';
import express from 'express';
const router = express.Router();

router.get('/', statsController);

export default router;