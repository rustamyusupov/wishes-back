const es = require('express-session');

const ThirtyDays = 30 * 24 * 60 * 60 * 1000;

const config = {
  cookie: {
    maxAge: ThirtyDays,
    secure: process.env.NODE_ENV === 'production',
  },
  resave: false,
  saveUninitialized: true,
  secret: 'keyboard cat',
};

const session = es(config);

module.exports = session;
