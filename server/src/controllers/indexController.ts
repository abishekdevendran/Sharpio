import { Request, Response } from 'express';

async function indexControllerGet(req: Request, res: Response) {
  res.send('Hello World!')
}

export default {
  indexControllerGet,
};