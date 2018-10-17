const mongoose = require('mongoose');
const Joi = require('joi');

const Costumer = mongoose.model('Costumer', new mongoose.Schema({
    isGold: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 60
    },
    phone: {
        type: String,
        required: true,
        minlength: 9,
        maxlength: 11
    }
}));


function validateCostumer(constumer) {
    const schema = {
        name: Joi.string().min(3).required(),
        phone: Joi.string().min(9).max(11).required(),
        isGold: Joi.boolean()
    }

    return Joi.validate(constumer, schema);
}

exports.Costumer = Costumer;
exports.validate = validateCostumer;