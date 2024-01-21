import { NextFunction, Request, Response } from 'express';

import { getData } from '../models';

export const models = async (req: Request, res: Response, next: NextFunction) => {
  const models = await getData();

  res.locals.models = models;

  next();
};
