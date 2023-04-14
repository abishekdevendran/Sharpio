import isAuth from '@/middleware/isAuth';
import express from 'express';
import userController from '@/controllers/userController';
const router = express.Router();

router.get('/logout', isAuth, userController.logout);
router.post('/newAchievement', isAuth, userController.newAchievement);
router.get('/achievements', isAuth, userController.getAchievements);
router.get('/', userController.data);

export default router;
