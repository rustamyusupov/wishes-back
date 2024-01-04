import url from 'url';
import path from 'path';
import server from 'json-server';

const dirname = path.dirname(url.fileURLToPath(import.meta.url));
const dbPath = path.join(dirname, 'db.json');

export const app = server.create();
const router = server.router(dbPath);
const middlewares = server.defaults();

app.use(middlewares);
app.use('/api', router);

app.listen(9000, () => {
  console.log('Server is running');
});
