import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { User } from '../types';
import { maxAge, millisecondsInSecond } from './constants';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'Username or Password not present',
    });
  }

  try {
    const { data } = res.locals.models;
    const user = data.users.find((user: User) => user.email === email);

    if (!user) {
      res.status(400).json({
        message: 'Login not successful',
        error: 'User not found',
      });
    }

    bcrypt.compare(password, user.password).then(result => {
      if (result) {
        const token = jwt.sign({ id: user.id, email }, import.meta.env.WISHES_SECRET, {
          expiresIn: maxAge,
        });

        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * millisecondsInSecond });
        res.status(201).json({
          message: 'User successfully Logged in',
          user: user.login,
        });
      } else {
        res.status(400).json({ message: 'Login not successful' });
      }
    });
  } catch (error) {
    res.status(400).json({
      message: 'An error occurred',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
};

export const verify = async (req: Request, res: Response) => {
  const token = req.cookies.jwt;

  if (token) {
    const user: JwtPayload | string = jwt.verify(token, import.meta.env.WISHES_SECRET);
    const isAuthenticated =
      typeof user !== 'string' && user?.exp && Date.now() < user.exp * millisecondsInSecond;

    res.status(201).json({ isAuthenticated });
  } else {
    res.status(400).json({ isAuthenticated: false });
  }
};
