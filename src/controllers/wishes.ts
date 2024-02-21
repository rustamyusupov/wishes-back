import type { Request, Response } from 'express';

import { User, Category, Wish, Currency, Price, CategoryWithWishes } from '../types';
import { getData, setData } from 'models';

export const getAll = async (req: Request, res: Response) => {
  const data = getData();

  if (!req.query.user) {
    res.status(200).send(data?.wishes);
    return;
  }

  const id = data?.users.find((user: User) => user.login === req.query.user)?.id;

  const result = data?.categories
    ?.map((category: Category) => {
      const prepared = data?.wishes
        .filter((wish: Wish) => wish.userId === id)
        .filter((wish: Wish) => wish.categoryId === category.id)
        .sort((a: Wish, b: Wish) => a.sort - b.sort);

      return {
        ...category,
        wishes: prepared?.map((wish: Wish) => ({
          ...wish,
          currency: data?.currencies?.find((c: Currency) => c.id === wish.currencyId)?.name,
          price: data?.prices.filter((p: Price) => p.wishId === wish.id).at(-1)?.value,
        })),
      };
    })
    ?.filter((category: CategoryWithWishes) => category.wishes.length > 0);

  res.status(200).send(result);
};

export const get = async (req: Request, res: Response) => {
  const data = getData();
  const wish = data.wishes.find((wish: Wish) => wish.id === Number(req.params.id));

  res.status(200).send(wish);
};

export const add = async (req: Request, res: Response) => {
  const data = getData();
  const { archive, link, name, categoryId, currencyId, price, sort } = req.body;
  const user = data?.users.find((user: User) => user.login === req.body.user);
  const id = data?.wishes.length;

  if (!user) {
    res.status(400).json({
      message: 'User not found',
    });

    return;
  }

  data.wishes.push({
    id,
    link,
    name,
    currencyId: Number(currencyId),
    categoryId: Number(categoryId),
    archive: Boolean(archive),
    sort: Number(sort) ?? 0,
    userId: user.id,
  });
  data.prices.push({
    id: data.prices.length,
    wishId: id,
    value: Number(price),
    date: new Date().toLocaleDateString('ru-RU'),
  });

  setData(data);

  const wish = data.wishes.find((wish: Wish) => wish.id === id);

  res.status(200).send(wish);
};

export const update = async (req: Request, res: Response) => {
  const data = getData();
  const wishId = Number(req.params.id);
  const newWish = data.wishes.find((wish: Wish) => wish.id === wishId);
  const { archive, link, name, categoryId, currencyId, sort } = req.body;

  if (newWish) {
    newWish.archive = Boolean(archive);
    newWish.categoryId = Number(categoryId);
    newWish.currencyId = Number(currencyId);
    newWish.link = link;
    newWish.name = name;
    newWish.sort = Number(sort) ?? 0;
  }

  const price = data.prices.filter((price: Price) => price.wishId === wishId).at(-1);
  const newPrice = Number(req.body.price);

  if (newWish && price && price?.value !== newPrice) {
    data.prices.push({
      id: data.prices.length,
      date: new Date().toLocaleDateString('ru-RU'),
      value: newPrice,
      wishId,
    });
  }

  setData(data);

  const wish = data.wishes.find((wish: Wish) => wish.id === Number(req.params.id));

  res.status(200).send(wish);
};

export const remove = async (req: Request, res: Response) => {
  const data = getData();
  const id = Number(req.params.id);

  data.wishes = data.wishes.filter((wish: Wish) => wish.id !== id);
  data.prices = data.prices.filter((price: Price) => price.wishId !== id);

  setData(data);

  res.status(200).json({});
};
