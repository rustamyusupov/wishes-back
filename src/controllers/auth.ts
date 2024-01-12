import type { Request, Response } from 'express';
// import bcrypt from 'bcrypt';

import { User } from 'types';

export const login = async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = res.locals.models.users.find((user: User) => user.email === email);

  // if (bcrypt.compareSync(password, user?.password)) {
  req.session.user = user.id;
  // }
};

export const logout = async (req: Request) => {
  req.session.destroy(err => {
    if (err) {
      console.error(err);
    }
  });
};
