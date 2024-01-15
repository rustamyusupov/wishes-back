import type { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { User, Category, Wish, Currency, Price, CategoryWithWishes } from 'types';

export const getAll = async (req: Request, res: Response) => {
  const { users, categories, wishes, currencies, prices } = res.locals.models;

  if (req.query.user) {
    const id = users.find(({ login }: { login: User['login'] }) => login === req.query.user)?.id;

    const result = categories
      ?.map((category: Category) => {
        const prepared = wishes
          .filter((wish: Wish) => wish.userId === id)
          .filter((wish: Wish) => wish.categoryId === category.id)
          .sort((a: Wish, b: Wish) => a.sort - b.sort);

        return {
          ...category,
          wishes: prepared?.map((wish: Wish) => ({
            ...wish,
            currency: currencies?.find((c: Currency) => c.id === wish.currencyId)?.name,
            price: prices?.findLast((p: Price) => p.wishId === wish.id)?.value,
          })),
        };
      })
      ?.filter((category: CategoryWithWishes) => category.wishes.length > 0);

    res.status(200).send(result);
    return;
  }

  res.status(200).send(wishes);
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

  res.locals.models.wishes.push(wish).write();
  res.locals.models.prices
    .push({
      date: new Date().toLocaleDateString('ru-RU'),
      id: uuidv4(),
      value: Number(price),
      wishId: id,
    })
    .write();

  res.status(200).send(wish);
};

export const update = async (req: Request, res: Response) => {
  res.status(200).send('update wish');
};

export const remove = async (req: Request, res: Response) => {
  res.status(200).send('delete wish');
};
