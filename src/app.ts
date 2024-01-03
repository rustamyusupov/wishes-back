import url from 'url';
import path from 'path';
import server from 'json-server';

const dirname = path.dirname(url.fileURLToPath(import.meta.url));
const dbPath = path.join(dirname, 'db.json');
import db from './db.json';

export const app = server.create();
const router = server.router(dbPath);

app.get('/wishes/api/categories', (req, res) => {
  const result = db.categories?.map(category => {
    const filtered = db.wishes?.filter(wish => wish.categoryId === category.id);
    const wishes = filtered?.map(wish => {
      return {
        ...wish,
        currency: db.currencies?.find(currency => currency.id === wish.currencyId)?.symbol,
        price: db.prices?.filter(price => price.wishId === wish.id).map(price => price.value),
      };
    });

    return { ...category, wishes };
  });

  res.jsonp(result);
});

app.use('/wishes/api', router);

app.listen(3000, () => {
  console.log('Server is running');
});
