import { Request, Response } from 'express';
import { validationResult, query } from 'express-validator';

async function indexControllerGet(req: Request, res: Response) {
  res.send('Hello World!')
}

export default {
  indexControllerGet,
};