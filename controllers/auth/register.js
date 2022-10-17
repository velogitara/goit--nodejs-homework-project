const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');

const { User } = require('../../models');
const { Conflict } = require('http-errors');
// const createError = require('http-errors');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    // throw new createError[409 || 'Conflict'](['Email in use']);
    throw new Conflict(`User with email=${email} already exist `);
  }
  const avatarURL = gravatar.url(email);
  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.create({ name, email, password: hashPassword, avatarURL });
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      user: {
        name: result.name,
        email: result.email,
        subscription: result.subscription,
        avatarURL,
      },
    },
  });
};

module.exports = register;
