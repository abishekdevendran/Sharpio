import { Request, Response } from 'express';

export function userLogoutController(req: Request, res: Response) {
	req.session.destroy((err) => {
		if (err) {
			console.log(err);
			res.redirect('/login');
		} else {
			res.redirect('/');
		}
	});
}

export function userDataController(req: Request, res: Response) {
	if (!req.session.user) {
		res.status(401).send({ message: 'User not logged in' });
	} else {
		console.log("Success");
		res.status(200).send({ user: req.session.user });
	}
}

export default {
  logout: userLogoutController,
  data: userDataController,
} 
