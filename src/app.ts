import jsonServer from 'json-server';

export const app = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

app.use(middlewares);
app.use('/api', router);

app.listen(3000, () => {
  console.log('Server is running');
});
