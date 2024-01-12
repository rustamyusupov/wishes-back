import es from 'express-session';

const ThirtyDays = 30 * 24 * 60 * 60 * 1000;
const config = {
  cookie: {
    maxAge: ThirtyDays,
    secure: false,
  },
  resave: false,
  saveUninitialized: false,
  secret: 'keyboard cat',
};

if (import.meta.env.PROD) {
  config.cookie.secure = true;
}

export const session = es(config);
