import { NextFunction, Request, Response } from 'express';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  if (/^-?\d+$/.test(String(req.session.user))) {
    next();
  } else {
    res.sendStatus(401);
  }
};
