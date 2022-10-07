const { Contact, joiSchema, favoriteJoiSchema } = require('./contact');
const { User, registerSchema, loginSchema, subscriptionJoiSchema } = require('./user');

module.exports = {
  Contact,
  joiSchema,
  favoriteJoiSchema,

  User,
  registerSchema,
  loginSchema,
  subscriptionJoiSchema,
};
