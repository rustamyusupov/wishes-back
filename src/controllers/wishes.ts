import type { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

export const getAll = async (req: Request, res: Response) => {
  res.status(200).send(res.locals.models.wishes);
};

export const get = async (req: Request, res: Response) => {
  const wish = res.locals.models.wishes.find(
    ({ id }: { id: number }) => id === Number(req.params.id)
  );

  res.status(200).send(wish);
};

export const add = async (req: Request, res: Response) => {
  const id = uuidv4();
  const { archive, categoryId, currencyId, link, name, price, sort, userId } = req.body;
  const wish = {
    archive: Boolean(archive),
    categoryId: Number(categoryId),
    currencyId: Number(currencyId),
    id,
    link,
    name,
    sort: Number(sort) ?? 0,
    userId: Number(userId),
  };

  res.locals.models.wishes.push(wish);
  res.locals.models.prices.push({
    date: new Date().toLocaleDateString('ru-RU'),
    id: uuidv4(),
    value: Number(price),
    wishId: id,
  });

  res.status(200).send(wish);
};

export const update = async (req: Request, res: Response) => {
  res.status(200).send('update wish');
};

export const remove = async (req: Request, res: Response) => {
  res.status(200).send('delete wish');
};
