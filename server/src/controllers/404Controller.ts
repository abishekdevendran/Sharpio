import { Request, Response } from 'express';

export default function (req: Request, res: Response) {
	res.status(404).send('404 Not Found');
}
