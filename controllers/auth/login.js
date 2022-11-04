const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require('../../models');

const { Unauthorized } = require('http-errors');
const createError = require('http-errors');

const { SECRET_KEY } = process.env;

const logIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Unauthorized('Email or password wrong');
  }
  if (!user.verify) {
    throw new Unauthorized('Email not verify');
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw new createError[401 || 'Unauthorized'](['Email or password wrong']);
  }
  // if (user.token) {
  //   throw new Conflict('User already logged In!');
  // }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '12h' });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    status: 'success',
    code: 200,
    data: {
      token: token,
    },
  });
};

module.exports = logIn;
