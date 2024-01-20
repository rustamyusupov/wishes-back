import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import { User } from 'types';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = res.locals.models.data.users.find((user: User) => user.email === email);

  if (bcrypt.compareSync(password, user?.password)) {
    req.session.user = user.id;
    res.status(200).send({ user: user.login });
    return;
  }

  res.sendStatus(401);
};

export const logout = async (req: Request, res: Response) => {
  req.session.destroy(err => {
    if (err) {
      console.error(err);
    }
  });

  res.sendStatus(200);
};
