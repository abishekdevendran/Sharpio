import { Request, Response } from 'express';

async function indexControllerGet(req: Request, res: Response) {
	res.send('Hello Worlds!');
}

export default {
	indexControllerGet,
};
