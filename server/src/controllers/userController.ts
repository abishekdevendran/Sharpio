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

export async function userAchievementController(req: Request, res: Response){
	const {newAchievement} = req.body;
	// get all achievements of user
	const achievements = await prisma.user.findUnique({
		where:{
			username: req.session.user?.username
		}
	}).then((user)=>user?.achievements);
	// check if achievement already exists
	if(achievements?.findIndex(newAchievement)!==-1){
		res.status(401).send("Achievement already exists");
	}
	else{
		// add new achievement to user
		await prisma.user.update({
			where:{
				username: req.session.user?.username
			},
			data:{
				achievements:{
					push: newAchievement
				}
			}
		});
		res.status(200).send("Achievement added");
	}
}

export default {
	logout: userLogoutController,
	data: userDataController,
	newAchievement: userAchievementController
};
