import type { Request, Response } from 'express';

export const getAll = async (req: Request, res: Response) => {
  res.status(200).send(res.locals.models.currencies);
};
