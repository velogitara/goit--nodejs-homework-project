const { Schema, model } = require('mongoose');
const joi = require('joi');

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

const registerSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const verifyEmailSchema = joi.object({
  email: joi.string().required(),
});

const subscriptionJoiSchema = joi.object({
  subscription: joi.string().required(),
});

const User = model('user', userSchema);

module.exports = {
  registerSchema,
  loginSchema,
  subscriptionJoiSchema,
  verifyEmailSchema,
  User,
};
