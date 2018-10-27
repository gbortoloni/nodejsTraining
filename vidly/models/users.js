const mongoose = require('mongoose');
const Joi = require('joi');
const PasswordComplexity = require('joi-password-complexity');

const User = mongoose.model('User', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024
    }
}));

const complexityOptions = {
    min: 6,
    max: 255
    // lowerCase: 1,
    // upperCase: 1,
    // numeric: 1,
    // symbol: 1,
    // requirementCount: 2,
  };

function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(20).required(),
        email: Joi.string().email().min(5).max(255).required(),
        password: Joi.string().required().email(),
        password: new PasswordComplexity(complexityOptions)
    }

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;