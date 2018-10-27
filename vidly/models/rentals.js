const mongoose = require('mongoose');
Joi.objectId = require('joi-objectid')(Joi);
const Joi = require('joi');


const Rental = mongoose.model('Rental', new mongoose.Schema({
    costumer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 3,
                maxlength: 60
            },
            isGold: {
                type: Boolean,
                default: false
            },
            phone: {
                type: String,
                required: true,
                minlength: 9,
                maxlength: 11
            }
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minlength: 5,
                maxlength: 255
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 255
            },
            dateOut: {
                type: Date,
                required: true,
                default: Date.now
            },
            dateReturned: {
                type: Date
            },
            rentalFee: {
                type: Number,
                min: 0
            }
        }),
        required: true
    }
}));

function validateRental(rental) {
    const schema = {
        costumerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    }

    return Joi.validate(rental, schema);
}

exports.Rental = Rental;
exports.validate = validateRental;