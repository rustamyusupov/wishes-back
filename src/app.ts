import url from 'url';
import path from 'path';
import jsonServer from 'json-server';

const dirname = path.dirname(url.fileURLToPath(import.meta.url));
const dbPath = path.join(dirname, 'db.json');

export const app = jsonServer.create();
const router = jsonServer.router(dbPath);
const middlewares = jsonServer.defaults();

app.use(middlewares);
app.use('/api', router);

app.listen(3000, () => {
  console.log('Server is running');
});
