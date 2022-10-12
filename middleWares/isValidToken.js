/*
1. взять логин из req.body
2. проверить есть ли он в базе Users
3.если есть проверить токен на валидность/expired
4.если expired в объекте User затереть поле token
*/
const jwt = require('jsonwebtoken');

const { User } = require('../models');

const { SECRET_KEY } = process.env;

const isValidToken = async (req, res, next) => {
  const { email } = req.body;
  const [{ token }] = await User.find({ email });
  const { id, exp } = jwt.verify(token, SECRET_KEY);
  const date = Date.now();

  const dateNum = Math.trunc(date / 1000);

  console.log('Date.Now:-', dateNum);
  console.log('token expired date:-', exp);
  if (dateNum >= exp) {
    console.log('we did erase');
    await User.findByIdAndUpdate(id, { token: null });
  }
  console.log('did next');
  next();
};

module.exports = isValidToken;
