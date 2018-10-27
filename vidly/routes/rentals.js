const {Rental, validate} = require('../models/rentals');
const {Costumer} = require('../models/costumers');
const {Movie} = require('../models/movies');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
});

router.get('/:id', async (req, res) => {
    const rental = await Rental.findById(req.params.id).sort('-dateOut');
    if (!rental) return res.status(404).send('The rental with the give ID was not found.');
    res.send(rental);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const costumer = await Costumer.findById(req.body.costumerId);
    if (!costumer) return res.status(400).send('Invalid costumer.');

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('Invalid movie.');

    if(movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');

    let rental = new Rental({
        costumer: {
            _id: costumer._id,
            name: costumer.name,
            phone: costumer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });

    try {
        rental = await rental.save();

        movie.numberInStock--;
        movie.save();

        res.send(rental);
    }
    catch(ex) {
        for (field in ex.errors) {
            console.log(ex.errors[field].message);
        }
    }
});