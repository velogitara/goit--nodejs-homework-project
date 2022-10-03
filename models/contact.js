const { Schema, model } = require('mongoose');

const Joi = require('Joi');

const { handleSchemaValidationErrors } = require('../helpers');

// const emailRegex = /.+\@.+\..+/;

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email address is required'],

      // validate: [emailRegex, 'Please fill a valid email address'],
    },
    phone: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post('save', handleSchemaValidationErrors);

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const favoriteJoiSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model('contacts', contactSchema);

module.exports = {
  Contact,
  joiSchema,
  favoriteJoiSchema,
};
