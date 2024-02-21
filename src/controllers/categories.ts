import type { Request, Response } from 'express';

import { getData } from 'models';

export const getAll = async (req: Request, res: Response) => {
  const data = getData();

  res.status(200).send(data?.categories);
};
