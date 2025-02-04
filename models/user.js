const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleSchemaValidationErrors } = require('../helpers');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: '',
    },
  },

  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleSchemaValidationErrors);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const verifyEmailSchema = Joi.object({
  email: Joi.string().required(),
});

const subscriptionJoiSchema = Joi.object({
  subscription: Joi.string().required(),
});

const User = model('user', userSchema);

module.exports = {
  registerSchema,
  loginSchema,
  subscriptionJoiSchema,
  verifyEmailSchema,
  User,
};
