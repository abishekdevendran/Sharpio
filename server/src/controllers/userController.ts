import { Request, Response } from 'express';
import prisma from '@/databases/postgresPrisma';

export function userLogoutController(req: Request, res: Response) {
	req.session.destroy((err) => {
		if (err) {
			console.log(err);
			res.status(500).send({ message: 'Error logging out' });
		} else {
			res.status(200).send({ message: 'Logged out' });
		}
	});
}

export function userDataController(req: Request, res: Response) {
	if (!req.session.user) {
		res.status(401).send({ message: 'User not logged in' });
	} else {
		console.log('Success');
		res.status(200).send({ user: req.session.user });
	}
}

export async function userAchievementController(req: Request, res: Response) {
	const { achievement:newAchievement } = req.body;
	console.log('Body: ', req.body);
	console.log('New achievement: ', newAchievement);
	// get all achievements of user
	let achievements = await prisma.user
		.findUnique({
			where: {
				username: req.session.user?.username,
			},
		})
		.then((user) => user?.achievements);
	if (!achievements || !achievements.includes(newAchievement)) {
		// update user
		try {
			await prisma.user.update({
				where: {
					username: req.session.user?.username,
				},
				data: {
					achievements: {
						push: newAchievement,
					},
				},
			});
		} catch (e) {
			console.log(e);
		}
		//update session
		if(req.session.user?.achievements){
			req.session.user.achievements.push(newAchievement);
		}
		else{
			req.session.user!.achievements = [newAchievement];
		}
		return res.status(200).send({ message: 'Achievement added' });
	}
	return res.status(200).send({ message: 'Achievement already exists' });
}

export async function userAchievementGetter(req: Request, res: Response) {
	const { username } = req.session.user!;
	console.log('Username: ', username);
	const achievements = await prisma.user
		.findUnique({
			where: {
				username,
			},
		})
		.then((user) => user?.achievements);
	if (achievements) {
		return res.status(200).send({ achievements });
	}
	return res.status(200).send({ message: 'No achievements' });
}

export default {
	logout: userLogoutController,
	data: userDataController,
	newAchievement: userAchievementController,
	getAchievements: userAchievementGetter,
};
