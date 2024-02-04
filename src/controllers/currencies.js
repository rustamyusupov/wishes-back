const getAll = async (req, res) => {
  res.status(200).send(res.locals.models.data.currencies);
};

module.exports = { getAll };
