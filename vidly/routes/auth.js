const _ = require('lodash');
const bcrypt = require('bcrypt');
const {User} = require('../models/users');
const Joi = require('joi');
const PasswordComplexity = require('joi-password-complexity');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid email or password.');

    const token = user.generateAuthToken();
    res.send(token);

});

const complexityOptions = {
    min: 6,
    max: 255
    // lowerCase: 1,
    // upperCase: 1,
    // numeric: 1,
    // symbol: 1,
    // requirementCount: 2,
  };

function validate(req) {
    const schema = {
        email: Joi.string().email().min(5).max(255).required(),
        password: Joi.string().required().email(),
        password: new PasswordComplexity(complexityOptions)
    }

    return Joi.validate(req, schema);
}


module.exports = router;