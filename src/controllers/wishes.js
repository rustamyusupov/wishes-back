const getAll = async (req, res) => {
  const { data } = res.locals.models;
  const wishes = data.get('wishes');

  if (req.query.user) {
    const id = data.get('users').find(user => user.login === req.query.user)?.id;

    const result = data
      .get('categories')
      ?.map(category => {
        const prepared = wishes
          .filter(wish => wish.userId === id)
          .filter(wish => wish.categoryId === category.id)
          .sort((a, b) => a.sort - b.sort);

        return {
          ...category,
          wishes: prepared?.map(wish => ({
            ...wish,
            currency: data.get('currencies')?.find(c => c.id === wish.currencyId)?.name,
            price: data.get('prices')?.findLast(p => p.wishId === wish.id)?.value,
          })),
        };
      })
      ?.filter(category => category.wishes.length > 0);

    res.status(200).send(result);
    return;
  }

  res.status(200).send(wishes);
};

const get = async (req, res) => {
  const wish = res.locals.models.data.get('wishes').find(wish => wish.id === Number(req.params.id));

  res.status(200).send(wish);
};

const add = async (req, res) => {
  const { archive, link, name, categoryId, currencyId, price, sort } = req.body;
  const user = res.locals.models.data.users.find(user => user.login === req.body.user);
  const id = res.locals.models.data.wishes.length;

  await res.locals.models.update(data => {
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

  const wish = res.locals.models.data.wishes.find(wish => wish.id === id);

  res.status(200).send(wish);
};

const update = async (req, res) => {
  const { archive, link, name, categoryId, currencyId, sort } = req.body;

  await res.locals.models.update(data => {
    const wish = data.wishes.find(wish => wish.id === Number(req.params.id));

    if (wish) {
      wish.archive = Boolean(archive);
      wish.categoryId = Number(categoryId);
      wish.currencyId = Number(currencyId);
      wish.link = link;
      wish.name = name;
      wish.sort = Number(sort) ?? 0;
    }

    const price = data.prices.findLast(price => price.wishId === Number(req.params.id));
    const newPrice = Number(req.body.price);

    if (wish && price && price?.value !== newPrice) {
      data.prices.push({
        id: data.prices.length,
        date: new Date().toLocaleDateString('ru-RU'),
        value: newPrice,
        wishId: Number(req.params.id),
      });
    }
  });

  const wish = res.locals.models.data.wishes.find(wish => wish.id === Number(req.params.id));

  res.status(200).send(wish);
};

const remove = async (req, res) => {
  await res.locals.models.update(data => {
    const id = Number(req.params.id);

    data.wishes = data.wishes.filter(wish => wish.id !== id);
    data.prices = data.prices.filter(price => price.wishId !== id);
  });

  res.status(200).json({});
};

module.exports = { getAll, get, add, update, remove };
