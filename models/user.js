const {Schema, model} = require('mongoose');
const Joi = require('joi');

const {handleSchemaValidationErrors} = require('../helpers');

const userSchema = Schema({
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
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  avatarURL: {
    type: String,
  },
  token: {
    type: String,
    default: null,
  }
}, {versionKey: false, timestamps: true});

userSchema.post('save', handleSchemaValidationErrors);

const signupSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().min(3).max(15).required(),
    repeat_password: Joi.ref('password'),
});

const loginSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  password: Joi.string().min(3).max(15).required(),
});

const schemas = {
    signupSchema,
    loginSchema
}

const User = model('user', userSchema);

module.exports = {
    User,
    schemas,
}