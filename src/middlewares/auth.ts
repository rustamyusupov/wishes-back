import { NextFunction, Request, Response } from 'express';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};
