const bcrypt = require('bcryptjs');

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = res.locals.models.data.users.find(user => user.email === email);

  if (bcrypt.compareSync(password, user?.password)) {
    req.session.user = user.id;
    res.status(200).send({ user: user.login });
    return;
  }

  res.sendStatus(401);
};

const logout = async (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error(err);
    }
  });

  res.sendStatus(200);
};

module.exports = { login, logout };
