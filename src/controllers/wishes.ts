import type { Request, Response } from 'express';

import { User, Category, Wish, Currency, Price, CategoryWithWishes, Data } from 'types';

export const getAll = async (req: Request, res: Response) => {
  const { users, categories, wishes, currencies, prices } = res.locals.models.data;

  if (req.query.user) {
    const id = users.find((user: User) => user.login === req.query.user)?.id;

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
  const wish = res.locals.models.data.wishes.find(
    (wish: Wish) => wish.id === Number(req.params.id)
  );

  res.status(200).send(wish);
};

export const add = async (req: Request, res: Response) => {
  const { archive, link, name, categoryId, currencyId, price, sort } = req.body;
  const user = res.locals.models.data.users.find((user: User) => user.login === req.body.user);
  const id = res.locals.models.data.wishes.length;

  await res.locals.models.update((data: Data) => {
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
  });

  const wish = res.locals.models.data.wishes.find((wish: Wish) => wish.id === id);

  res.status(200).send(wish);
};

export const update = async (req: Request, res: Response) => {
  const { archive, link, name, categoryId, currencyId, sort } = req.body;

  await res.locals.models.update((data: Data) => {
    const wish = data.wishes.find((wish: Wish) => wish.id === Number(req.params.id));

    if (wish) {
      wish.archive = Boolean(archive);
      wish.categoryId = Number(categoryId);
      wish.currencyId = Number(currencyId);
      wish.link = link;
      wish.name = name;
      wish.sort = Number(sort) ?? 0;
    }

    const price = data.prices.findLast((price: Price) => price.wishId === Number(req.params.id));
    const newPrice = Number(req.body.price);

    if (wish && price && price?.value !== newPrice) {
      data.prices.push({
        id: data.prices.length,
        date: new Date().toLocaleDateString('ru-RU'),
        value: newPrice,
        wishId: wish.id,
      });
    }
  });

  const wish = res.locals.models.data.wishes.find(
    (wish: Wish) => wish.id === Number(req.params.id)
  );

  res.status(200).send(wish);
};

export const remove = async (req: Request, res: Response) => {
  res.status(200).send('delete wish');
};
