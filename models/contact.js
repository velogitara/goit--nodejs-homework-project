const { Schema, model } = require('mongoose');

// const Joi = require('Joi');

const bookSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    pnone: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timeStamp: true }
);

const Contact = model('book', bookSchema);

// const addSchema = Joi.object({
//   name: Joi.string().alphanum().min(2).max(30).required(),
//   email: Joi.string().email().required(),
//   phone: Joi.string().required(),
// });

// const schemas = {
//   addSchema,
// };

module.exports = {
  Contact,
  //   schemas,
};
