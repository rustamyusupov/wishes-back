import url from 'url';
import path from 'path';
import server from 'json-server';

import db from './db.json';

const dirname = path.dirname(url.fileURLToPath(import.meta.url));
const dbPath = path.join(dirname, 'db.json');

export const app = server.create();
const router = server.router(dbPath);
const middlewares = server.defaults();

app.use(middlewares);

app.get('/api/categories', (req, res) => {
  const result = db.categories?.map(category => {
    const filtered = db.wishes?.filter(wish => wish.categoryId === category.id);
    const wishes = filtered?.map(wish => {
      return {
        ...wish,
        currency: db.currencies?.find(currency => currency.id === wish.currencyId)?.name,
        prices: db.prices?.filter(price => price.wishId === wish.id).map(price => price.value),
      };
    });

    return { ...category, wishes };
  });

  res.jsonp(result);
});

app.use('/api', router);

app.listen(9000, () => {
  console.log('Server is running');
});
