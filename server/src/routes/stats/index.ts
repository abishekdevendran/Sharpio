import statsController from '@/controllers/statsController';
import express from 'express';
const router = express.Router();

router.get('/', statsController.statsHandler);
router.post('/users', statsController.matchingUsersHandler);

export default router;
