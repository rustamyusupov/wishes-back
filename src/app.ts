import { Request, Response } from 'express';
import url from 'url';
import path from 'path';
import server from 'json-server';
import auth from 'json-server-auth';

const dirname = path.dirname(url.fileURLToPath(import.meta.url));
const dbPath = path.join(dirname, 'db.json');

export const app = server.create();
const router = server.router(dbPath);
const middlewares = server.defaults();

const getList = (req: Request, res: Response) => {
  const db = router.db;
  const users = db.get('users');
  const categories = db.get('categories');
  const currencies = db.get('currencies');
  const prices = db.get('prices');
  const wishes = db.get('wishes');
  // @ts-expect-error should be fixed
  const userId = users.find({ login: req.query.user })?.value()?.id;

  if (userId === undefined) {
    res.status(404).jsonp([]);
    return;
  }

  // TODO refactor, use lodash
  const result = categories
    // @ts-expect-error should be fixed
    ?.map(category => {
      const prepared = wishes
        // @ts-expect-error should be fixed
        ?.filter({ userId })
        // @ts-expect-error should be fixed
        ?.filter(wish => wish.categoryId === category.id)
        // @ts-expect-error should be fixed
        .sort((a, b) => a.sort - b.sort);

      return {
        ...category,
        wishes: prepared
          // @ts-expect-error should be fixed
          ?.map(wish => ({
            ...wish,
            // @ts-expect-error should be fixed
            currency: currencies?.find({ id: wish.currencyId })?.value()?.name,
            // @ts-expect-error should be fixed
            price: prices?.findLast({ wishId: wish.id })?.value()?.value,
          }))
          .value(),
      };
    })
    // @ts-expect-error should be fixed
    ?.filter(category => category.wishes.length > 0);

  res.status(200).jsonp(result);
  return;
};

const addWish = (req: Request, res: Response) => {
  const db = router.db;
  const users = db.get('users');
  const wishes = db.get('wishes');
  const prices = db.get('prices');
  const { archive, categoryId, currencyId, link, name, price, sort, user } = req.body;
  // @ts-expect-error should be fixed
  const wishId = (wishes.last()?.value()?.id || 0) + 1;

  const response = wishes
    // @ts-expect-error should be fixed
    ?.push({
      archive: Boolean(archive),
      categoryId: Number(categoryId),
      currencyId: Number(currencyId),
      id: wishId,
      link,
      name,
      sort: Number(sort) ?? 0,
      // @ts-expect-error should be fixed
      userId: users.find({ name: user })?.value()?.id,
    })
    .write();

  prices
    // @ts-expect-error should be fixed
    ?.push({
      // @ts-expect-error should be fixed
      id: (prices.last()?.value()?.id || 0) + 1,
      wishId,
      value: Number(price),
      date: new Date().toLocaleDateString('ru-RU'),
    })
    .write();

  res.status(200).jsonp(response);
  return;
};

const updateWish = (req: Request, res: Response) => {
  const db = router.db;
  const users = db.get('users');
  const wishes = db.get('wishes');
  const prices = db.get('prices');
  const wishId = Number(req.params.id);
  // @ts-expect-error should be fixed
  const wish = wishes.find({ id: wishId });
  const { archive, categoryId, currencyId, link, name, price, sort, user } = req.body;

  const response = wish
    ?.assign({
      archive: Boolean(archive),
      categoryId: Number(categoryId),
      currencyId: Number(currencyId),
      link,
      name,
      sort: Number(sort) ?? 0,
      // @ts-expect-error should be fixed
      userId: users.find({ name: user })?.value()?.id,
    })
    .write();

  // @ts-expect-error should be fixed
  if (prices.findLast({ wishId })?.value()?.value !== Number(price)) {
    prices
      // @ts-expect-error should be fixed
      ?.push({
        // @ts-expect-error should be fixed
        id: (prices.last()?.value()?.id || 0) + 1,
        wishId,
        value: Number(price),
        date: new Date().toLocaleDateString('ru-RU'),
      })
      .write();
  }

  res.status(200).jsonp(response);
  return;
};

// https://github.com/jeremyben/json-server-auth?tab=readme-ov-file#guarded-routes-
const rules = auth.rewriter({
  // @ts-expect-error should be fixed
  '/api/categories': '/444/api/categories',
  // @ts-expect-error should be fixed
  '/api/currencies': '/444/api/currencies',
  // @ts-expect-error should be fixed
  '/api/prices': '/600/api/prices',
  // @ts-expect-error should be fixed
  '/api/users': '/400/api/users',
  // @ts-expect-error should be fixed
  '/api/wishes*': '/640/api/wishes$1',
  // @ts-expect-error should be fixed
  '/api/wishlist': '/644/api/wishlist',
});

// @ts-expect-error should be fixed
app.db = router.db;

app.use(middlewares);
app.use(server.bodyParser);
app.get('/api/wishlist', getList);
app.post('/wishes', addWish);
app.put('/wishes/:id', updateWish);
app.use(rules);
app.use(auth);
app.use('/api', router);

app.listen(9000, () => {
  console.log('Server is running');
});
