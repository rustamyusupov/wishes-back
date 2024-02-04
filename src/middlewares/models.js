const m = require('../models/index.js');

const models = async (req, res, next) => {
  const data = await m.getData();

  res.locals.models = { data };

  next();
};

module.exports = models;
