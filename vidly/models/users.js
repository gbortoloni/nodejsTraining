const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const PasswordComplexity = require('joi-password-complexity');

const userSchema = new mongoose.Schema({
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
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, 'jwtPrivateKey');
    return token
}

const User = mongoose.model('User', userSchema);

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