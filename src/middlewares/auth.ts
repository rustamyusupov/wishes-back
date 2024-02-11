import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;
  const jwtSecret = process.env.WISHES_SECRET;

  if (token) {
    jwt.verify(token, jwtSecret, (err: unknown) => {
      if (err) {
        return res.status(401).json({ message: 'Not authorized' });
      }

      next();
    });
  } else {
    return res.status(401).json({ message: 'Not authorized, token not available' });
  }
};
