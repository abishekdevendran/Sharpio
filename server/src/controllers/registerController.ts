import CryptoJS from 'crypto-js';
import { Request, Response } from 'express';
import prisma from '@/databases/postgresPrisma';

export default async function registerController(req: Request, res: Response) {
	const { username, password, email } = req.body;
	const clientSecret = process.env.COUPLING_SECRET;
	//unhash password from client
	const unhashedPassword = CryptoJS.AES.decrypt(
		password,
		clientSecret!
	).toString(CryptoJS.enc.Utf8);
	try {
		let user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
		if (user) {
			//user already exists
			return res.status(409).json({ message: 'Username is taken' });
		}
		user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
		if (user) {
			//user already exists
			return res.status(409).json({ message: 'User already exists' });
		}
		//hash password using sha256
		const hashedPassword = CryptoJS.SHA256(unhashedPassword).toString(
			CryptoJS.enc.Base64
		);
		//create user
		const newUser = await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
        email: email,
      },
    });
		//set session
		req.session.user = newUser;
		return res.status(201).json({ message: 'User created' });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Internal server error' });
	}
}
