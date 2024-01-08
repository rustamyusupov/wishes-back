import { Request, Response } from 'express';
import url from 'url';
import path from 'path';
import server from 'json-server';

const dirname = path.dirname(url.fileURLToPath(import.meta.url));
const dbPath = path.join(dirname, 'db.json');

export const app = server.create();
const router = server.router(dbPath);
const middlewares = server.defaults();

app.use(middlewares);
app.use(server.bodyParser);

const addWish = (req: Request, res: Response) => {
  const db = router.db;
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
      price: Number(price),
      sort: Number(sort) ?? 0,
      userId: Number(user),
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
      price: Number(price),
      sort: Number(sort) ?? 0,
      userId: Number(user),
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

app.post('/api/wishes', addWish);
app.put('/api/wishes/:id', updateWish);
app.use('/api', router);

app.listen(9000, () => {
  console.log('Server is running');
});
