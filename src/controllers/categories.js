const getAll = async (req, res) => {
  res.status(200).send(res.locals.models.data.categories);
};

module.exports = { getAll };
