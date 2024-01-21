import es from 'express-session';

const ThirtyDays = 30 * 24 * 60 * 60 * 1000;
const config = {
  cookie: {
    maxAge: ThirtyDays,
    secure: import.meta.env.PROD,
  },
  resave: false,
  saveUninitialized: true,
  secret: 'keyboard cat',
};

export const session = es(config);
