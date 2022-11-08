const { Schema, model } = require('mongoose');

const joi = require('joi');

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
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post('save', handleSchemaValidationErrors);

const joiSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  phone: joi.string().required(),
  favorite: joi.boolean(),
});

const favoriteJoiSchema = joi.object({
  favorite: joi.boolean().required(),
});

const Contact = model('contacts', contactSchema);

module.exports = {
  Contact,
  joiSchema,
  favoriteJoiSchema,
};
